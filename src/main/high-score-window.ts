import { BrowserWindow } from "electron";

export class HighScoreWindow {
  private window: BrowserWindow | null = null;

  public open() {
    if (this.window) {
      this.window.show();
      return;
    }

    this.window = new BrowserWindow({
      width: 400,
      height: 500,
      center: true,
    });

    this.window.on('close', () => {
      this.window = null;
    });

    this.window.on('ready-to-show', () => {
      if (!this.window?.isVisible()) {
        this.window?.show();
      }
    });

    this.window.removeMenu();
    this.window.loadFile('../ui-high-scores/index.html');
  }
}
