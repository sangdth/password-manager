import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
/**
 * Set `__static` path to static files in productest
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
// let appIcon;

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 660,
    useContentSize: true,
    width: 1024,
    // show: false, // Hide your application until your page has loaded
  });

  mainWindow.loadURL(winURL);

  // appIcon = new Tray(path.join(__dirname, '/icons/icon@2x.png'));

  // const contextMenu = Menu.buildFromTemplate([
  //   {
  //     label: 'Show App',
  //     click: () => {
  //       // mainWindow.show();
  //       if (mainWindow.isVisible()) {
  //         mainWindow.hide();
  //       } else {
  //         mainWindow.show();
  //       }
  //     },
  //   },
  //   {
  //     label: 'Quit',
  //     click: () => {
  //       app.isQuiting = true;
  //       app.quit();
  //     },
  //   },
  // ]);

  // Then, when everything is loaded, show the window and focus it
  // mainWindow.once('ready-to-show', () => {
  //   appIcon.setContextMenu(contextMenu);
  //   mainWindow.show();
  //   mainWindow.focus();
  // });

  // mainWindow.on('close', (event) => {
  //   if (app.isQuiting) {
  //     mainWindow = null;
  //   } else {
  //     event.preventDefault();
  //     mainWindow.hide();
  //   }
  // });
  
  if (process.platform === 'darwin') {
    // Create our menu entries so that we can use MAC shortcuts
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' }
        ]
      }
    ]));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
