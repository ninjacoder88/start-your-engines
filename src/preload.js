const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    saveData: (apps) => ipcRenderer.send("save-data", apps),
    loadData: () => ipcRenderer.invoke("loadData"),
    startApplications: (paths) => ipcRenderer.send("start-apps", paths)
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) {
            element.innerText = text;
        }
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});