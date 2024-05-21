import React from "react";
import cl from "./Counter.module.css";

interface ICounterProps {
  initValue: number;
}

class Counter extends React.Component<ICounterProps> {
    state = {
        count: this.props.initValue,
      };

      increment = () => {
        this.setState({
            count: this.state.count + 1
        })
      }

      decrement = () => {
        this.setState({
            count: this.state.count - 1
        })
      }
    

  render() {
    return (<article className={cl.counter}>
    <h2>
      {this.state.count}
    </h2>
    <div className={cl.counterControls}>
      <button onClick={this.increment}>
        Plus
      </button>
      <button onClick={this.decrement}>
        Minus
      </button>
    </div>
  </article>);
  }
}

export default Counter;
