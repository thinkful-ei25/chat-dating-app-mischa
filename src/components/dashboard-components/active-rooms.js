import React from 'react';
import { getActiveRoomsSuccess } from '../../actions/dashboard';
import { joinRoom } from '../../actions/chat-room';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../../config';
export class ActiveRooms extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(API_BASE_URL);
  }
  componentDidMount() {
    this.socket.emit('find-room');
    this.socket.on('active-rooms', data => {
      console.log(data);
      this.props.dispatch(getActiveRoomsSuccess(data));
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  render() {
    return null;
  }
}

export default connect()(ActiveRooms);
