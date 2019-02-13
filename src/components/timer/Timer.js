import React, { Component } from 'react';
import { pad } from './utils';
import classNames from 'classnames';
import './Timer.css';
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { minutes: 0, seconds: 0 };
  }

  componentDidMount() {
    let { minutes, seconds } = this.props.time;
    if (!minutes) {
      minutes = 0;
    }
    if (!seconds) {
      seconds = 0;
    }
    this.setState({ minutes, seconds });
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
    const { callback } = this.props;
    callback(this.state);
    const { minutes, seconds } = this.state;
    const addWarning = minutes < 1;
    return (
      <div className={classNames('timer', addWarning && 'warning')}>
        {minutes}:{pad(seconds)}
      </div>
    );
  }
}
