const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    ipcMain.on('save-data', (event, apps) => {
        try {
            fs.writeFileSync("c:\\temp\\test.log", apps);
        } catch (error){
            console.error(error);
        }
    });

    win.loadFile("app/index.html");
};

app.whenReady().then(() => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    ipcMain.handle("loadData", () => {
        try {
            const fileText = fs.readFileSync("c:\\temp\\test.log", "utf-8");
            const jsonObject = JSON.parse(fileText);
            return jsonObject;
        } catch (error){
            console.error(error);
        }
    });

    createWindow();
    
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});