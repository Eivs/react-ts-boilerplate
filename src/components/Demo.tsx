import * as React from "react";

export interface IFDemoProps { compiler: string; framework: string; }

export class Demo extends React.Component<IFDemoProps, {}> {
  public render() {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
