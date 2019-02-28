import * as React from "react";
import { IComponent } from "../../common/models/Component";

interface IProps {
  component: IComponent;
  onClick: (component: IComponent) => void;
  isSelected: boolean | undefined;
}

const selectedStyle = {
  color: "blue",
  fontWeight: "bold",
};

const unselectedStyle = {
  color: "black",
};

// tslint:disable:trailing-comma
// tslint:disable-next-line:variable-name
export const ComponentsListItem = (props: IProps) => {
  const style = props.isSelected ? selectedStyle : unselectedStyle;
  return (
    <li style={style}
        onClick={() => props.onClick(props.component)}>{props.component.tag}</li>
  );

};
