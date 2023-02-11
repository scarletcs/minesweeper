import { app, session } from 'electron';
import { MainWindow } from './main-window';

app.disableHardwareAcceleration();

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": `
          default-src 'self' 'unsafe-inline';
          img-src 'self' data:;
        `,
      }
    });
  });

  const main = new MainWindow();
  main.open();
});

app.on('window-all-closed', () => {
  app.quit();
});
