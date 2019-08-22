import {app, BrowserWindow} from "electron";

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
