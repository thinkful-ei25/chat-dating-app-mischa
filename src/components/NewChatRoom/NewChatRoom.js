import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startChatRoom } from '../../actions/chat-room';
import { Redirect } from 'react-router-dom';
import './NewChatRoom.css';
export class NewChatRoom extends Component {
  state = {
    chatRoomUrl: null,
    submitted: false,
  };
  onClickHandler() {
    this.props.dispatch(startChatRoom(this.props.history)).then(url => {
      this.setState({
        submitted: true,
        chatRoomUrl: url,
      });
    });
  }
  render() {
    if (this.state.submitted) {
      return <Redirect to={this.state.chatRoomUrl} />;
    }
    return (
      <button
        className="button open-room"
        onClick={() => this.onClickHandler()}
      >
        Start a chatroom
      </button>
    );
  }
}

export default connect()(NewChatRoom);
