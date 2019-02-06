import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMessages, newMessage } from '../../actions/chat';
import { userJoined, deactivateRoom } from '../../actions/chat-room';
import { wipeMessages } from '../../actions/chat';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import Input from './input';
import Logout from '../auth-components/logout';
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
      return <div>waiting</div>;
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

    return (
      <Fragment>
        <section className="users">
          <ul>
            <li className="active-users" key={1}>
              <div> {user1 && user1.username}</div>
            </li>
            <li className="active-users" key={2}>
              <div> {user2 && user2.username}</div>
            </li>
          </ul>
        </section>
        <table className="messages chat-area">
          <tbody>{chatMessages}</tbody>
        </table>
        {this.renderComponents()}

        <Link
          className="button leave-chatroom"
          to="/dashboard"
          onClick={() => this.props.dispatch(wipeMessages())}
        >
          Leave Room
        </Link>
        <Logout />
      </Fragment>
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
