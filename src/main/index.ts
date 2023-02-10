import { app, BrowserWindow } from 'electron';

const DEV_MODE = process.env.NODE_ENV === 'development';

if (DEV_MODE) {
  require('electron-reload');
}

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
      if (DEV_MODE) {
        this.window?.webContents.openDevTools({
          mode: 'detach'
        });
      }
    });

    this.window.removeMenu();
    this.window.loadFile('../ui/index.html');
  }
}

app.whenReady().then(() => {
  const main = new MainWindow();
  main.open();
});

app.on('window-all-closed', () => {
  app.quit();
});
