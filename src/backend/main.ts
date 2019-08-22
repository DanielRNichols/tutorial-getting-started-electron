import {app, BrowserWindow, ipcMain} from "electron";
import {SqliteConnection} from "./services/sqliteConnection";

let mainWindow: BrowserWindow | null;
let sqliteConn: SqliteConnection;

const createWindow = () => {

  mainWindow = new BrowserWindow({width: 800, height: 800, resizable: true});
  // tslint:disable-next-line:no-floating-promises
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  // tslint:disable-next-line:no-floating-promises
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    console.log("Closing window");
    mainWindow = null;
  });

};

const initDb = () => {
  sqliteConn = new SqliteConnection("model.db");

};

app.on("ready", () => {
  console.log("app is ready");
  console.log(app.getAppPath());
  createWindow();
  initDb();

});

ipcMain.on("refresh-request", async () => {
  console.log("Received refresh-request");
  if (!mainWindow) {
    throw new Error("No main window");
  }
  if (!sqliteConn) {
    throw new Error("No db connection");
  }
  const result = await sqliteConn.query("Select * from components");
  console.log(result);
  if (result instanceof Error) {
    console.log("Error retrieving data");
  }
  mainWindow.webContents.send("data-updated", result);
});
