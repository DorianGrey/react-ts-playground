import * as React from "react";
import { FormattedDate } from "react-intl";

export default class CurrentTime extends React.Component<any, any> {
  state: {
    date: Date;
  } = {
    date: new Date()
  };

  private interval: number;

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentWillMount(): void {
    this.interval = (setInterval(
      () => this.setState({ date: new Date() }),
      1000
    ) as any) as number; // God-damn node-typings ...
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        <FormattedDate
          value={this.state.date}
          year="numeric"
          month="long"
          day="2-digit"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
        />
      </div>
    );
  }
}
