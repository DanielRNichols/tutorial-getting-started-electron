import * as React from "react";
import {IpcRenderer} from "electron";
import { RefreshButton } from "./components/RefreshButton";

interface IState {
}

interface IProps {
  title: string;
}

declare global {
  interface Window {
    require: NodeRequire;
  }
}

export class App extends React.Component <IProps, IState> {

  private _ipc: IpcRenderer | undefined;
  constructor(props: IProps) {
    super(props);
    this._initializeIpc();
    this._listenForDataUpdated();
  }

  private _initializeIpc() {
    if (window.require) {
      try {
        this._ipc = window.require("electron").ipcRenderer;
      } catch (err) {
        throw err;
      }
    } else {
      console.log(`Electron's IPC was not loaded`);
    }
  }

  private _listenForDataUpdated() {
    if(this._ipc) {
      this._ipc.on("data-updated", (data: any) => {
        console.log(`New data received!: ${data}`);
      });
    }
  }

  private _onRefreshButtonClick = () => {
    console.log("Refresh Button clicked");
    if(this._ipc) {
      this._ipc.send("refresh-request");
    }
  }

  public render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <RefreshButton title="Refresh" onClick={this._onRefreshButtonClick} />
      </div>
    );
  }
};
