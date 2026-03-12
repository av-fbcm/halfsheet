const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startOAuth: (params) => ipcRenderer.invoke('oauth-start', params),
})
