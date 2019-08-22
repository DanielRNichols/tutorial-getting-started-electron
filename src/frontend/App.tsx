import * as React from "react";
import {ipcRenderer, Event} from "electron";
// import { RefreshButton } from "./components/RefreshButton";
import {IComponent} from "../common/models/Component";
import {IFilter} from "../common/models/IFilter";
import {ComponentsView} from "./components/ComponentsView";
import {FilterButtonGroup} from "./components/FilterButtonGroup";
import {FilterRadioGroup} from "./components/FilterRadioGroup";
import {IQueryOptions} from "../backend/services/queryOptions";

// tslint:disable-next-line:no-empty-interface - Just until we add some state
interface IState {
  components: IComponent[];
  isLoading: boolean;
  error: Error | undefined;
  selectedComponent: IComponent | undefined;
  filter: IFilter;
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

  public state: IState;
  private _selectedComponentId: string = "";
  private _filters = [
    {key: "all", title: "All Components", queryString: ""},
    {key: "valves", title: "Valves", queryString: "className='valve'"},
    {key: "pumps", title: "Pumps", queryString: "className='pump'"},
    {key: "tanks", title: "Tanks", queryString: "className='tank'"},
    {key: "equipment", title: "Equipment", queryString: "className='pump' or className='tank'"},
  ];

  constructor(props: IProps) {
    super(props);

    this.state = { components: [], isLoading: true, error: undefined,
      selectedComponent: undefined, filter: this._filters[0] };

  }

  private _findComponentById = (components: IComponent[], compId: string): IComponent | undefined => {
    return components.find((comp) => comp.id === compId);
  }

  public getFilter = (key: string): IFilter => {
    const filter = this._filters.find((f) => f.key === key);
    if (filter) {
      return filter;
    }
    return this._filters[0];
  }

  public clearFilter = async () => {
    const filter = this.getFilter("all");
    this.setState({filter});
    this.requestData(filter);
  }

  public filterOnValves = async () => {
    const filter = this.getFilter("valves");
    this.setState({filter});
    this.requestData(filter);
  }

  public filterOnEquipment = async () => {
    const filter = this.getFilter("equipment");
    this.setState({filter});
    this.requestData(filter);
  }

  public onFilterChanged = async (filter: IFilter) => {
    this.setState({filter});
    this.requestData(filter);
  }

  public onComponentViewComponentClick = (comp: IComponent) => {
    this._selectedComponentId = comp.id;
    this.setState({selectedComponent: comp});
  }

  public render() {
    if (this.state.isLoading) {
      return <h3>Loading...</h3>;
    }
    if (this.state.error) {
      return <h3>Error: {this.state.error.message}</h3>;
    }
    // console.log(this.state.components);
    return (
     <div>
      <FilterButtonGroup filters={this._filters}
                        selectedFilter={this.state.filter}
                        onClick={this.onFilterChanged} />
      <FilterRadioGroup filters={this._filters}
                        selectedFilter={this.state.filter}
                        onChange={this.onFilterChanged} />
      <ComponentsView title={this.state.filter.title}
                      components={this.state.components}
                      selectedComponent={this.state.selectedComponent}
                      onComponentClick={this.onComponentViewComponentClick} />
     </div>
   );
  }

  private requestData(filter: IFilter) {

    const queryOptions: IQueryOptions = {
      filter: filter.queryString,
      orderBy: undefined,
      limit: 0,
    };
    ipcRenderer.send("refresh-request", queryOptions);
  }

  public async componentDidMount() {
    console.log("In componentDidMount");

    // initial fetch of data
    this.requestData(this.state.filter);

    ipcRenderer.on("data-updated", (event: Event, data: IComponent[]) => {
      console.log(data);
      // check to see if the currently selected component is in the new list
      const comp = this._findComponentById(data, this._selectedComponentId);
      if (!comp) {
        this._selectedComponentId = "";
      }
      this.setState({
        components: data, isLoading: false, error: undefined,
        selectedComponent: comp,
      });
    });
  }
}
