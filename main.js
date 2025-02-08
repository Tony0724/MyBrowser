import {app, BrowserWindow} from 'electron'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // 보안 강화
        }
    });

    win.loadURL('https://www.naver.com'); // 초기 로드할 웹사이트
});
