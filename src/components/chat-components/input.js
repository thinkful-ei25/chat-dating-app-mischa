import React, { Component } from 'react';
import './input.css';

export default class Input extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { socket, url, username } = this.props;
    socket.emit('send_message', {
      message: this.chat.value,
      url,
      username,
    });
    this.chat.value = '';
  }
  render() {
    return (
      <form className="input-flex-container" onSubmit={e => this.onSubmit(e)}>
        <input
          aria-label="input"
          className="write-message"
          style={{ width: '85%', marginRight: '10px' }}
          type="text"
          placeholder="say something"
          ref={input => (this.chat = input)}
        />

        <button className="button message-btn" type="submit">
          send
        </button>
      </form>
    );
  }
}
