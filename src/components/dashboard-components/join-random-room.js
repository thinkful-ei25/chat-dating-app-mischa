import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './join-random-room.css';
export class JoinRandomRoom extends Component {
  render() {
    const { activeRooms } = this.props;
    if (!activeRooms) {
      return (
        <div className="dashboard-content">
          Start a chatroom to get Flamingaling!
        </div>
      );
    } else {
      return (
        <section className="random-room">
          <Link to={activeRooms} className="button">
            Join Pat
          </Link>
          (aka chatroom)
        </section>
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
