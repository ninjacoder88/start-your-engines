const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const cp = require("child_process");

const filePath = "c:\\git\\localhost\\configuration\\start-your-engines\\applications.json";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    ipcMain.on('save-data', (event, apps) => {
        try {
            fs.writeFileSync(filePath, apps);
        } catch (error){
            console.error(error);
        }
    });

    ipcMain.on('start-apps', (event, paths) => {
        paths.forEach(appPath => {
            try {
                appPath = appPath.replaceAll("\\", "/");
                cp.exec(`start ${appPath}`, (error, stdout, stderr) => {
                    console.log(error);
                });
            } catch(error) {
                console.log(error);
            }
            
        });
    });

    win.loadFile("app/index.html");
};

app.whenReady().then(() => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

    ipcMain.handle("loadData", () => {
        try {
            if(fs.existsSync() === false) {
                fs.writeFileSync(filePath, "[]");
            }

            const fileText = fs.readFileSync(filePath, "utf-8");
            const jsonObject = JSON.parse(fileText);
            return jsonObject;
        } catch (error){
            console.log(error);
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