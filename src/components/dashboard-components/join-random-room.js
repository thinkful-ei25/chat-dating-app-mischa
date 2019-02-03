import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/chat-room';
import { withRouter } from 'react-router-dom';
import { arrayIsEmpty } from '../../utils';
export class JoinRandomRoom extends Component {
  onClickHandler() {
    const num = Math.floor(Math.random() * this.props.activeRooms.length);
    const { url } = this.props.activeRooms[num];
    this.props.dispatch(joinRoom(this.props.history, url));
  }
  render() {
    if (arrayIsEmpty(this.props.activeRooms)) {
      return (
        <h3>
          No Flamingaling happening yet! <br />
          Start a Pat (chatroom) to get Flamingaling!
        </h3>
      );
    } else {
      return (
        <Fragment>
          {/* <h3>Joing a random Pat (chatroom)!</h3> */}
          <button
            className="button random-room"
            onClick={() => this.onClickHandler()}
          >
            Join a Pat
          </button>
          (aka chatroom)
        </Fragment>
      );
    }
  }
}
const mapStatetoProps = state => {
  return {
    activeRooms:
      state.dashboard &&
      state.dashboard.activeRooms.filter(room => room.users.length < 2),
  };
};
export default withRouter(connect(mapStatetoProps)(JoinRandomRoom));
