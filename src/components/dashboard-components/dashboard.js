import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import io from 'socket.io-client';
import ActiveRooms from './active-rooms';
import JoinRandomRoom from './join-random-room';
import NewChatRoom from '../chat-components/newChatRoomBtn';
import Logout from '../auth-components/logout';

export class Dashboard extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <ActiveRooms />
        <JoinRandomRoom />
        <h3>Do you want to start a new Pat (chatroom)?</h3>
        <NewChatRoom />
        <Logout />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
