import path from 'path';
import { app, crashReporter, BrowserWindow, Menu } from 'electron';
import store from './store';
const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow = null;
let graphWindow = null;
let forceQuit = false;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'Defect Finder',
  companyName: 'Ostap Pushkar',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    show: false,
    title: 'Defect Finder',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  graphWindow = new BrowserWindow({
    width: 850,
    height: 710,
    minWidth: 850,
    minHeight: 710,
    show: false,
    title: 'Graphs',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
  graphWindow.loadURL(
    `file://${path.join(__dirname, '../renderer/index.html#/graph')}`,
  );


  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
    graphWindow.show();

  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
          graphWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
        graphWindow.show();

        mainWindow.crashReporter();

        graphWindow.crashReporter();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        app.quit();
        mainWindow = null;
        graphWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools();
    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y);
          },
        },
      ]).popup(mainWindow);
    });
  }
});
// eslint-disable-next-line no-unused-vars
let currentState;
store.subscribe(() => {
  currentState = store.getState();
});
