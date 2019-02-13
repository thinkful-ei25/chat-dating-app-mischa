import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newMessage } from '../../actions/chat';
import { userJoined, deactivateRoom } from '../../actions/chat-room';
import { wipeMessages } from '../../actions/chat';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import Input from './input';
import Timer from '../timer';

import Questions from './questions';
import './chatArea.css';

export class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.socket = io(API_BASE_URL);
  }

  componentDidMount() {
    const { socket } = this;
    const { dispatch, username, url } = this.props;
    socket.on('recieve_message', data => {
      dispatch(newMessage(data));
    });
    this.socket.emit('subscribe', { chatroom: url, username });
    socket.on('joined', data => {
      dispatch(userJoined(data));
    });
    socket.on('partnerLeftRoom', data => {
      dispatch(deactivateRoom(data));
    });
  }

  //stop polling server on sign out
  componentWillUnmount() {
    this.socket.disconnect();
  }

  renderComponents() {
    // const numberOfUsers = this.props.activeUsers.length;
    const { username, questions, number, url, active, waiting } = this.props;
    const question = questions[number];
    if (!active) {
      return <div>Your partner left!</div>;
    } else if (waiting) {
      return;
    } else {
      return (
        <Fragment>
          <Questions
            question={question}
            username={username}
            url={url}
            socket={this.socket}
          />

          <Input socket={this.socket} url={url} username={username} />
        </Fragment>
      );
    }
  }
  render() {
    const {
      loggedIn,
      messages,
      username,
      history,
      waiting,
      user1,
      user2,
      active,
    } = this.props;
    if (!loggedIn) {
      history.push('/');
      return null;
    }
    let chatMessages;
    waiting
      ? (chatMessages = (
          <div>
            As soon as another user joins the room, you'll be able to see the
            questions and type!
          </div>
        ))
      : (chatMessages = messages.map((message, i) => {
          return (
            <div key={i}>
              <div
                className={
                  message.user === username ? 'me user' : 'partner user'
                }
              >
                <div
                  className={
                    message.user === username
                      ? 'message my-mess'
                      : 'message partner-mess'
                  }
                >
                  {message.message}
                </div>
              </div>
            </div>
          );
        }));
    if (
      !chatMessages.length &&
      user1 &&
      user1.username &&
      user2 &&
      user2.username
    ) {
      chatMessages.push(
        <div>
          {user1.username} joined! <br />
          {user2.username} joined!
        </div>
      );
    }
    return (
      <div className="chat-area-container">
        <Link
          id="leave-chatroom"
          className="button"
          to="/dashboard"
          onClick={() => this.props.dispatch(wipeMessages())}
        >
          Leave
        </Link>
        {active && !waiting && <Timer />}
        <div className="messages chat-area">
          <div>{chatMessages}</div>
        </div>
        {this.renderComponents()}
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  const { chatroom, chat, auth } = state;
  const { currentUser } = auth;
  const {
    user1,
    user2,
    active,
    waiting,
    questions,
    questionNumberToDisplay: number,
  } = chatroom;
  return {
    messages: chat.chatWindow,
    loggedIn: currentUser && currentUser.loggedIn,
    username: currentUser && currentUser.username,
    url: ownProps.location.pathname,
    user1,
    user2,
    active,
    waiting,
    questions,
    number,
  };
};
export default connect(mapStatetoProps)(ChatArea);
