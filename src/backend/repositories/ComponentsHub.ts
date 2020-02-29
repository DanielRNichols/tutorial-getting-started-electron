import { IComponentsRepository } from "./IComponentsRepository";
import { IComponent } from "../../common/models/Component";
import { Hub } from "../services/hub";
import { IQueryOptions } from "../services/queryOptions";

export class ComponentsHub implements IComponentsRepository {

  private _resourceName = "components";
  private _hub: Hub;

  constructor(baseUrl: string) {
    this._hub = new Hub(baseUrl);
  }

  public async getComponents(queryOptions?: IQueryOptions): Promise<IComponent[] | Error> {
    const query = `${this._resourceName}${this._hub.getQueryString(queryOptions)}`;
    console.log(`query = ${query}`);
    try {
      const result = await this._hub.getData(query);
      if (result instanceof Error) {
        return result;
      }
      return(result);
    } catch (err) {
      throw err;
    }
  }

  public async getComponentById(id: string): Promise<IComponent | Error> {
    const query = `${this._resourceName}/${id}`;
    console.log(`query = ${query}`);
    try {
      const result = await this._hub.getData(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.length <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(result[0]);
    } catch (err) {
      throw err;
    }
  }

  public async addComponent(comp: IComponent): Promise<string | Error> {
    throw new Error('Not implemented');
  }

  public async updateComponent(comp: IComponent): Promise<IComponent | Error> {
    throw new Error('Not implemented');
  }

  public async deleteComponent(id: string): Promise<boolean | Error> {
    throw new Error('Not implemented');
  }
}
