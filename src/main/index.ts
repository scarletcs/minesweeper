import { app, Menu, session } from 'electron';
import { HighScoreWindow } from './high-score-window';
import { MainWindow } from './main-window';

app.disableHardwareAcceleration();

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": `
          default-src 'self' 'unsafe-inline';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          img-src 'self' data:;
        `,
      }
    });
  });

  const main = new MainWindow();
  const highScores = new HighScoreWindow();

  const menu = Menu.buildFromTemplate([
    {
      label: 'Game',
      submenu: [
        { label: 'New Game', click: () => null },
        { label: 'High Scores', click: () => highScores.open() },
        { type: 'separator' },
        { role: 'quit' },
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  main.open();
});

app.on('window-all-closed', () => {
  app.quit();
});
