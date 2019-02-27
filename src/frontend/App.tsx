import * as React from "react";

interface IState {
}

interface IProps {
  title: string;
}

export class App extends React.Component <IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  public render () {
    console.log("Render app");
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
};
