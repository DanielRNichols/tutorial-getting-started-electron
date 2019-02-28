import { IProperties } from "./Properties";

export interface IComponent {
  id: string;
  className: string;
  tag: string;
  locked: boolean;
  properties: IProperties;
}
