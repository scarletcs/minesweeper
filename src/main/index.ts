import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import fs from 'fs';

const DEV_MODE = process.env.NODE_ENV === 'development';
const UI_PATH = path.resolve(__dirname, '../ui/');

app.disableHardwareAcceleration();

class MainWindow {
  private window: BrowserWindow | null = null;

  public open() {
    if (this.window) {
      this.window.show();
      return;
    }

    this.window = new BrowserWindow({
      width: 800,
      height: 800,
    });

    this.window.on('close', () => {
      this.window = null;
    });

    this.window.on('ready-to-show', () => {
      this.window?.show();

      if (DEV_MODE) {
        fs.watch(path.resolve(UI_PATH, 'index.js'), (event, filename) => {
          this.window?.reload();
        })
      }
    });

    this.window.removeMenu();
    this.window?.webContents.openDevTools({
      mode: 'detach'
    });
    this.window.loadFile('../ui/index.html');
  }
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: Object.assign({
        "Content-Security-Policy": `
          default-src 'self' 'unsafe-inline';
          img-src 'self' data:;
        `,
    }, details.responseHeaders)});
  });

  const main = new MainWindow();
  main.open();
});

app.on('window-all-closed', () => {
  app.quit();
});
