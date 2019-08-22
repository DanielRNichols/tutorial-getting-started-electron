import {app, BrowserWindow, ipcMain} from "electron";
import {SqliteConnection} from "./services/sqliteConnection";
import {ComponentsDb} from "./repositories/ComponentsDb";
import {IComponent} from "../common/models/Component";
import { IQueryOptions } from "./services/queryOptions";

let mainWindow: BrowserWindow | null;
let compsDb: ComponentsDb | undefined;

const createWindow = () => {

  mainWindow = new BrowserWindow(
    { width: 800,
      height: 800,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  const htmlFile = `file://${__dirname}/../index.html`;
  // tslint:disable-next-line:no-floating-promises
  mainWindow.loadURL(htmlFile);
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    console.log("Closing window");
    mainWindow = null;
  });

};

const initDb = () => {
  const sqliteConnection: SqliteConnection = new SqliteConnection("model.db");
  compsDb = new ComponentsDb(sqliteConnection);

};

app.on("ready", () => {
  console.log("app is ready");
  console.log(app.getAppPath());
  createWindow();
  initDb();

});

ipcMain.on("refresh-request", async (sender: any, queryOptions: IQueryOptions) => {
  console.log("Received refresh-request!");
  console.log(queryOptions);
  if (!mainWindow) {
    throw new Error("mainWindow is not defined");
  }
  if (!compsDb) {
    throw new Error("compsDb is not defined");
  }
  console.log("Read data from compsDb");
  let data: IComponent[] | Error = new Error ("nothing happening");
  const result = await compsDb.getComponents(queryOptions);
  if (result instanceof Error) {
    data = result;
  } else {
    data = result;
  }

  console.log("Sending data-updated!!");
  console.log(data);
  mainWindow.webContents.send("data-updated", data);
});
