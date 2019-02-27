import {app, BrowserWindow} from "electron";

let win: BrowserWindow | null;

const createWindow = () => {

  win = new BrowserWindow({width: 640, height: 480});
  win.loadURL(`file://${__dirname}/index.html`);
  win.on("closed", () => {
    console.log("Closing window");
    win = null;
  });

};

app.on("ready", () => {
  console.log("app is ready");
  createWindow();

});
