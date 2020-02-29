import { IProperties } from "./Properties";

export interface IComponent {
  id: string;
  className: string;
  tag: string;
  description: string;
  manufacturer: string;
  locked: boolean;
  properties: IProperties;
}
