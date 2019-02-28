import { IComponent } from "../../common/models/Component";
import { IQueryOptions } from "../services/queryOptions";

export interface IComponentsRepository {

  GetComponents: (queryOptions?: IQueryOptions) => Promise<IComponent[] | Error>;
  GetComponentById: (id: string) => Promise<IComponent | Error>;
  AddComponent: (comp: IComponent) => Promise<string | Error>;
  UpdateComponent: (comp: IComponent) => Promise<IComponent | Error>;
  DeleteComponent: (id: string) => Promise<boolean | Error>;
}
