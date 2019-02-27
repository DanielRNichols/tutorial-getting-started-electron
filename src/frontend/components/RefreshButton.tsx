import * as React from "react";

interface IProps {
  title: string;
  onClick: () => void;
}

export const RefreshButton = (props: IProps) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.title}</button>
    </div>
  );
};
