const { app, BrowserWindow, shell, ipcMain } = require('electron')
const path = require('path')
const http = require('http')
const net = require('net')
const { URL } = require('url')

// Find a free port on localhost
function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
    server.on('error', reject)
  })
}

// Handle OAuth PKCE flow via loopback redirect
ipcMain.handle('oauth-start', async (event, { authUrl, redirectPort }) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${redirectPort}`)
      const code = url.searchParams.get('code')
      const error = url.searchParams.get('error')

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`
        <html><body style="font-family:sans-serif;text-align:center;padding:60px">
          <h2>✅ Signed in successfully!</h2>
          <p>You can close this tab and return to the app.</p>
          <script>window.close()</script>
        </body></html>
      `)

      server.close()

      if (error) {
        reject(new Error('OAuth error: ' + error))
      } else if (code) {
        resolve(code)
      } else {
        reject(new Error('No code received'))
      }
    })

    server.listen(redirectPort, '127.0.0.1', () => {
      shell.openExternal(authUrl)
    })

    server.on('error', reject)

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close()
      reject(new Error('OAuth timed out'))
    }, 5 * 60 * 1000)
  })
})

// Render an HTML string to a real PDF using Chromium's own print engine.
// Offscreen window → same layout as Ctrl+P, no extra dependencies.
ipcMain.handle('html-to-pdf', async (event, { html, landscape = true }) => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  })
  try {
    await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html))
    // Give webfonts and base64 images a beat to settle before snapshotting.
    await new Promise(r => setTimeout(r, 600))
    const pdf = await win.webContents.printToPDF({
      // pageSize is in INCHES. 11x8.5 is already landscape, so leave `landscape`
      // false — setting both would rotate it back to portrait.
      pageSize: landscape ? { width: 11, height: 8.5 } : { width: 8.5, height: 11 },
      landscape: false,
      printBackground: true,
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    })
    return pdf.toString('base64')
  } finally {
    win.destroy()
  }
})

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'FBC Muncie — Half-Sheet Generator',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    win.loadURL('http://localhost:5173')
  }

  win.once('ready-to-show', () => win.show())

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
