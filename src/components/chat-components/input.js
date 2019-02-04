import React, { Component } from 'react';
import { postMessage } from '../../actions/chat';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import { connect } from 'react-redux';
import './input.css';
export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroom: null,
    };
    this.socket = io(API_BASE_URL);
  }
  onSubmit(e) {
    // const roomUrl = this.props.location.pathname;
    // console.log(roomUrl);
    const { url } = this.props;
    console.log(url);
    e.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      message: this.chat.value,
      url,
      username: this.props.username,
    });
    this.chat.value = '';
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          aria-label="input"
          className="messages"
          style={{ width: '85%', marginRight: '10px' }}
          type="text"
          placeholder="chat!"
          ref={input => (this.chat = input)}
        />

        <button className="button" type="submit">
          send
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.currentUser ? state.auth.currentUser.id : null,
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    roomId: state.chatroom.roomId,
    url: state.chatroom.roomUrl,
  };
};
export default connect(mapStateToProps)(Input);
