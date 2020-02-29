import { IComponentsRepository } from "./IComponentsRepository";
import { IComponent } from "../../common/models/Component";
import { SqliteConnection } from "../services/sqliteConnection";
import { IQueryOptions } from "../services/queryOptions";

const rowToComponent = (row: any): IComponent => {
  return {
    id: row.id,
    className: row.className,
    tag: row.tag,
    description: row.description,
    manufacturer: row.manufacturer,
    locked: row.locked != null && row.locked !== 0,
    properties: row.properties ? JSON.parse(row.properties) : [],
  };
};

const rowsToComponentArray = (rows: any[]): IComponent[] => {
  const comps: IComponent[] = [];
  if (rows) {
    rows.map((row) => {
      comps.push(rowToComponent(row));
    });
  }

  return comps;
};

export class ComponentsDb implements IComponentsRepository {

  private _tableName = "components";
  private _sqliteServices: SqliteConnection;

  constructor(sqliteServices: SqliteConnection) {
    this._sqliteServices = sqliteServices;
  }

  public async getComponents(queryOptions?: IQueryOptions): Promise<IComponent[] | Error> {
    const query = this._sqliteServices.getQueryString(this._tableName, queryOptions);
    console.log(`query = ${query}`);
    try {
      const result = await this._sqliteServices.query(query);
      if (result instanceof Error) {
        return result;
      }
      return(rowsToComponentArray(result));
    } catch (err) {
      throw err;
    }
  }

  public async getComponentById(id: string): Promise<IComponent | Error> {
    const query = `Select * from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteServices.query(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.length <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(rowToComponent(result[0]));
    } catch (err) {
      throw err;
    }
  }

  public async addComponent(comp: IComponent): Promise<string | Error> {
    const className = comp.className;
    const tag = comp.tag;
    const locked = comp.locked ? 1 : 0;
    const properties = comp.properties ? JSON.stringify(comp.properties) : "";
    const query = `Insert into ${this._tableName} (className, tag, locked, properties) Values
                    ('${className}', '${tag}', ${locked}, '${properties}')`;
    try {
      const result = await this._sqliteServices.execute(query);
      if (result instanceof Error) {
        return result;
      }
      return(result.lastId);
    } catch (err) {
      throw err;
    }
}

  public async updateComponent(comp: IComponent): Promise<IComponent | Error> {
    const className = comp.className;
    const tag = comp.tag;
    const locked = comp.locked ? 1 : 0;
    const properties = comp.properties ? JSON.stringify(comp.properties) : "";
    const query = `Update ${this._tableName}
                   Set className='${className}',
                       tag ='${tag}',
                       locked =${locked},
                       properties='${properties}'
                    Where id=${comp.id}`;
    try {
      const result = await this._sqliteServices.execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${comp.id}]`);
      }
      return(comp);
    } catch (err) {
      throw err;
    }
  }

  public async deleteComponent(id: string): Promise<boolean | Error> {
    const query = `Delete from ${this._tableName} where id=${id}`;
    try {
      const result = await this._sqliteServices.execute(query);
      if (result instanceof Error) {
        return result;
      }
      if (result.rowsAffected <= 0) {
        return new Error(`No record found for id:[${id}]`);
      }
      return(true);
    } catch (err) {
      throw err;
    }
  }

}
