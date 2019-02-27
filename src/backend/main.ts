import {app, BrowserWindow, ipcMain} from "electron";

let mainWindow: BrowserWindow | null;

const createWindow = () => {

  mainWindow = new BrowserWindow({width: 640, height: 480, resizable: true});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", () => {
    console.log("Closing window");
    mainWindow = null;
  });

};

app.on("ready", () => {
  console.log("app is ready");
  console.log(app.getAppPath());
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
