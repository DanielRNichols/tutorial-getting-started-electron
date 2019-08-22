import { IWbsItem } from "../../common/models/WbsItem";
import { IQueryOptions } from "../services/queryOptions";

export interface IWbsItemsRepository {

  getWbsItems: (queryOptions?: IQueryOptions) => Promise<IWbsItem[] | Error>;
  getWbsItemById: (id: string) => Promise<IWbsItem | Error>;
  addWbsItem: (item: IWbsItem) => Promise<string | Error>;
  updateWbsItem: (item: IWbsItem) => Promise<IWbsItem | Error>;
  deleteWbsItem: (id: string) => Promise<boolean | Error>;
}
