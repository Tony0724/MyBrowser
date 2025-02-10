import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    createTab: (url) => ipcRenderer.send("create-tab", url),
    closeTab: (tabId) => ipcRenderer.send("close-tab", tabId),
    onAddTab: (callback) => ipcRenderer.on("add-tab", (event, url) => callback(url)),
    onRemoveTab: (callback) => ipcRenderer.on("remove-tab", (event, tabId) => callback(tabId))
});
