import React,{Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ActiveRooms from '../dashboard-components/active-rooms';
import JoinRandomRoom from '../dashboard-components/join-random-room';
import NewChatRoom from './newChatRoomBtn';
import {stillActive}  from '../../actions/auth';
import {withRouter} from 'react-router-dom';
import Logout from './logout';
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:8000');
// console.log(socket);
// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

export class Dashboard extends Component {
  componentDidMount(){
    // setInterval(() => {
    //   this.props.dispatch(stillActive());
    // }, 1000 * 3)    
  };
  render(){
    if (!this.props.loggedIn) {
      this.props.history.push('/');
      return null;
    }else{
      return (
        <Fragment>
          <ActiveRooms />
          <JoinRandomRoom />
          <h2>Do you want to start a chat?</h2>
          <NewChatRoom />
          <Logout /> 
        </Fragment>
      )
    }
  }
}
      

const mapStateToProps = state => {
    return ({
      loggedIn: state.auth.currentUser !== null
    })
  };
  
  export default withRouter(connect(mapStateToProps)(Dashboard));
  