import {app, BrowserWindow, ipcMain} from "electron";
// import {SqliteConnection} from "./services/sqliteConnection";
import {IComponent} from "../common/models/Component";
import { IQueryOptions } from "./services/queryOptions";
// import {ComponentsDb} from "./repositories/ComponentsDb";
import { ComponentsHub } from "./repositories/ComponentsHub";
import { IComponentsRepository } from "./repositories/IComponentsRepository";

let mainWindow: BrowserWindow | null;
let compsHub: IComponentsRepository | undefined;
// let compsDb: IComponentsRepository | undefined;

const createWindow = () => {

  mainWindow = new BrowserWindow(
    { width: 800,
      height: 800,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false,
    });

  const htmlFile = `file://${__dirname}/../index.html`;
  mainWindow.loadURL(htmlFile);
  mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    console.log("Closing window");
    mainWindow = null;
  });

};

const initHub = () => {
  compsHub = new ComponentsHub('http://localhost:4060/api/');
}

// const initDb = () => {
//   const sqliteConnection: SqliteConnection = new SqliteConnection("model.db");
//   compsDb = new ComponentsDb(sqliteConnection);

// };

app.on("ready", () => {
  console.log("app is ready");
  console.log(app.getAppPath());
  createWindow();
  initHub();
  // initDb();

});

ipcMain.on("refresh-request", async (sender: any, queryOptions: IQueryOptions) => {

  console.log("Received refresh-request!");
  console.log(queryOptions);
  if (!mainWindow) {
    throw new Error("mainWindow is not defined");
  }

  let data: IComponent[] | Error = new Error ("nothing happening");

  if(!compsHub) {
    throw new Error("Hub is not defined");
  }
  const result = await compsHub.getComponents(queryOptions);
  console.log(result);

  // if (!compsDb) {
  //   throw new Error("compsDb is not defined");
  // }
  // console.log("Read data from compsDb");
  // const result = await compsDb.getComponents(queryOptions);

  if (result instanceof Error) {
    data = result;
  } else {
    data = result;
  }

  console.log("Sending data-updated!!");
  console.log(`Number of components found: ${ data instanceof Error ? 0 : data.length}`);
  mainWindow.webContents.send("data-updated", data);
});
