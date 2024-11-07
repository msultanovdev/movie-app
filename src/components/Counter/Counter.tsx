import React from "react";
import cl from "./Counter.module.css";
import { ICounterProps } from "../../types";

class Counter extends React.Component<ICounterProps> {
  state = {
    count: this.props.initValue,
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
  static defaultProps: { initValue: number };
  componentDidUpdate(prevProps: ICounterProps) {
    if (prevProps.initValue !== this.props.initValue) {
      this.setState({ count: this.props.initValue });
    }
  }

  render() {
    return (
      <article className={cl.counter}>
        <h2>{this.state.count}</h2>
        <div className={cl.counterControls}>
          <button onClick={this.increment}>Plus</button>
          <button onClick={this.decrement}>Minus</button>
        </div>
      </article>
    );
  }
}

Counter.defaultProps = {
  initValue: 0,
};

export default Counter;
