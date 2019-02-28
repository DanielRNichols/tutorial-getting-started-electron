import { IProperties } from "./Properties";

export interface IWbsItem {
  id: string;
  className: string;
  tag: string;
  properties?: IProperties;
}
