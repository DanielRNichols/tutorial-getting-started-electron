import {app, BrowserWindow, ipcMain} from "electron";

let mainWindow: BrowserWindow | null;

const createWindow = () => {

  mainWindow = new BrowserWindow({width: 800, height: 600});

  // tslint:disable-next-line:no-floating-promises
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    console.log("Closing window");
    mainWindow = null;
  });

};

app.on("ready", () => {
  console.log("app is ready");
  createWindow();

});

ipcMain.on("refresh-request", () => {
  console.log("Received refresh-request");
  if (mainWindow) {
    const data: any = {myValue: 2};
    console.log("Sending data-updated");
    mainWindow.webContents.send("data-updated", data);
  }
});
