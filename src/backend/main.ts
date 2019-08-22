import {app, BrowserWindow, ipcMain} from "electron";


let win: BrowserWindow | null;

const createWindow = () => {

  win = new BrowserWindow({width: 800, height: 600});

  // tslint:disable-next-line:no-floating-promises
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  win.on("closed", () => {
    console.log("Closing window");
    win = null;
  });

};

app.on("ready", () => {
  console.log("app is ready");
  createWindow();

});

ipcMain.on("refresh-request", () => {
  console.log("Received refresh-request");
  if(mainWindow) {
    const data: any = {myValue: 2};
    console.log("Sending data-updated");
    mainWindow.webContents.send("data-updated", data);
  }
});
