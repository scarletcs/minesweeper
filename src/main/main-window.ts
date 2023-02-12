import { BrowserWindow } from "electron";
import { DEV_MODE, UI_PATH } from "./environment";
import path from 'path';
import fs from 'fs';

export class MainWindow {
  private window: BrowserWindow | null = null;

  public open() {
    if (this.window) {
      this.window.show();
      return;
    }

    this.window = new BrowserWindow({
      width: 800,
      height: 600,
    });

    this.window.on('close', () => {
      this.window = null;
    });

    this.window.on('ready-to-show', () => {
      this.watch();
      if (!this.window?.isVisible()) {
        this.window?.show();
      }
      this.window?.webContents.openDevTools({
        mode: 'detach'
      });
    });

    this.window.removeMenu();
    this.window.loadFile('../ui/index.html');
  }

  private watch(): void {
    if (DEV_MODE) {
      fs.watch(path.resolve(UI_PATH), (event, filename) => {
        this.window?.reload();
      })
    }
  }
}
