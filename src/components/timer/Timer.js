import React, { Component } from 'react';
import { pad } from './utils';
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { minutes: 0, seconds: 0 };
  }

  componentDidMount() {
    this.setState({ minutes: 5, seconds: 0 });
    this.timer = setInterval(() => {
      let { minutes, seconds } = this.state;
      if (seconds === 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }
      this.setState({
        minutes,
        seconds,
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer = clearInterval();
  }
  render() {
    const { minutes, seconds } = this.state;
    return (
      <div>
        {minutes}:{pad(seconds)}
      </div>
    );
  }
}
