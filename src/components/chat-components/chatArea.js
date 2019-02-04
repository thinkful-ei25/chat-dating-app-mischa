import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, newMessage } from '../../actions/chat';
import { userJoined, deactivateRoom } from '../../actions/chat-room';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import LeaveChatRoom from './leaveRoom';
import Input from './input';
import Logout from '../auth-components/logout';
import Questions from './questions';
import './chatArea.css';

export class ChatArea extends Component {
  constructor(props) {
    const { username, pathname } = props;
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
    clearInterval(this.interval);
    this.socket.disconnect();
  }

  renderComponents() {
    // const numberOfUsers = this.props.activeUsers.length;
    const { user1, user2, active } = this.props;
    console.log(user1, user2);
    /* DEAL WITH USERS COMING AND GOING */

    if (user1 && user2 && user1.active && user2.active) {
      return (
        <Fragment>
          <Questions />

          <Input roomAddress={this.props.roomAddress} />
        </Fragment>
      );
    }
  }
  render() {
    if (!this.props.loggedIn) {
      this.props.history.push('/');
      return null;
    }
    const chatMessages = this.props.messages.map(message => {
      return (
        <tr key={message.id}>
          {/* <th>  header*/}
          <td
            className={
              message.user === this.props.username ? 'me user' : 'partner user'
            }
          >
            {message.user}:
          </td>
          <td>{message.message}</td>
        </tr>
      );
    });

    const { user1, user2 } = this.props;
    // });
    return (
      <Fragment>
        <section className="users">
          <ul>
            <li className="active-users" key={1}>
              <span> {user1 && user1.username}</span>
            </li>
            <li className="active-users" key={2}>
              <span> {user2 && user2.username}</span>
            </li>
          </ul>
        </section>
        <table className="messages chat-area">
          <tbody>{chatMessages}</tbody>
        </table>

        {this.renderComponents()}

        <span>
          <LeaveChatRoom />
        </span>

        <span>
          <Logout />
        </span>
      </Fragment>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    messages: state.chat.chatWindow,
    loggedIn: state.auth.currentUser && state.auth.currentUser.loggedIn,
    username: state.auth.currentUser && state.auth.currentUser.username,
    jwt: state.auth.authToken,
    url: state.chatroom.roomUrl || ownProps.location.pathname,
    questions: state.chatroom.questions,
    user1: state.chatroom.user1,
    user2: state.chatroom.user2,
    active: state.chatroom.activeRoom,
    waiting: state.chatroom.waiting,
  };
};
export default connect(mapStatetoProps)(ChatArea);
