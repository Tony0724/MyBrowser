import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // 네이버 로딩을 위한 설정
        }
    });

    // index.html을 로드하고 네이버도 기본 페이지로 로드
    mainWindow.loadFile(join(__dirname, "index.html"));

    ipcMain.on("create-tab", (event, url) => {
        mainWindow.webContents.send("add-tab", url);
    });

    ipcMain.on("close-tab", (event, tabId) => {
        mainWindow.webContents.send("remove-tab", tabId);
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
