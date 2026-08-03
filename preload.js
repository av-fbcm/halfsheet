const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startOAuth: (params) => ipcRenderer.invoke('oauth-start', params),
  htmlToPdf: (params) => ipcRenderer.invoke('html-to-pdf', params),
})
