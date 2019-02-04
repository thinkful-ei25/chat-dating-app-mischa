import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/chat-room';
import { Link } from 'react-router-dom';
import { arrayIsEmpty } from '../../utils';
export class JoinRandomRoom extends Component {
  onClickHandler() {
    this.props.dispatch(joinRoom(this.props.history, this.props.activeRooms));
  }
  render() {
    const { activeRooms } = this.props;
    if (!activeRooms) {
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
          <Link to={activeRooms} className="button random-room">
            Join Pat
          </Link>
          (aka chatroom)
        </Fragment>
      );
    }
  }
}
const mapStatetoProps = state => {
  return {
    activeRooms: state.dashboard && state.dashboard.activeRooms,
  };
};
export default connect(mapStatetoProps)(JoinRandomRoom);
