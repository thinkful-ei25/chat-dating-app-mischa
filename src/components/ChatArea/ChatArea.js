import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newMessage } from '../../actions/chat';
import { userJoined, deactivateRoom } from '../../actions/chat-room';
import { wipeMessages } from '../../actions/chat';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import classNames from 'classnames';
import Input from '../chat-components/input';
import Timer from '../timer';

import Questions from '../Questions';
import './ChatArea.css';

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
    if (active && !waiting) {
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
    } else {
      return;
    }
  }
  timer = ({ minutes }) => {
    const { dispatch } = this.props;
    if (minutes < 0) {
      dispatch(
        deactivateRoom({
          timesUp: true,
        })
      );
    }
  };
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
      timesUp,
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
                animation-name="warning"
                className={classNames(
                  message.user === username ? 'me' : 'partner',
                  'user'
                )}
              >
                <div
                  className={classNames(
                    message.user === username ? 'my-mess' : 'partner-mess',
                    'message'
                  )}
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
        <div key={1}>
          {user1.username} joined! <br />
          {user2.username} joined!
        </div>
      );
    }
    return (
      <div className="chat-area-container">
        <div className="tools-container">
          {active && !waiting ? (
            <Timer time={{ minutes: 5, seconds: 0 }} callback={this.timer} />
          ) : timesUp ? (
            <div>Times Up!</div>
          ) : !active && !waiting ? (
            <div>Your Partner Left!</div>
          ) : (
            <div />
          )}
          <Link
            id="leave-chatroom"
            className="button"
            to="/dashboard"
            onClick={() => this.props.dispatch(wipeMessages())}
          >
            Leave
          </Link>
        </div>
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
    timesUp,
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
    timesUp,
  };
};
export default connect(mapStatetoProps)(ChatArea);
