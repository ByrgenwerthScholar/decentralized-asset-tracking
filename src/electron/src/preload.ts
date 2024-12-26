import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose methods to the renderer process
  sendMessage: (message: string) => ipcRenderer.send('message', message),
});
