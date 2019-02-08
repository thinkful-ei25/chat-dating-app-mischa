import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import JoinRandomRoom from './join-random-room';
import NewChatRoom from '../chat-components/newChatRoomBtn';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
import { getActiveRoomsSuccess } from '../../actions/dashboard';
import './dashboard.css';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.socket = io(API_BASE_URL);
  }
  componentDidMount() {
    this.socket.emit('find-room');
    this.socket.on('active-rooms', data => {
      this.props.dispatch(getActiveRoomsSuccess(data));
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  render() {
    const { loggedIn, activeRooms } = this.props;
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <main className="dashboard">
        <JoinRandomRoom />
        {activeRooms ? (
          <div className="dashboard-content">Or start your own chatroom</div>
        ) : null}
        <NewChatRoom className="start-chat" />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
    activeRooms: state.dashboard && state.dashboard.activeRooms,
  };
};

export default connect(mapStateToProps)(Dashboard);
