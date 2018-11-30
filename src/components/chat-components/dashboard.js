import React,{Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ActiveRooms from '../dashboard-components/active-rooms';
import JoinRandomRoom from '../dashboard-components/join-random-room';
import NewChatRoom from './newChatRoomBtn';
import {withRouter} from 'react-router-dom';
import Logout from './logout';

export class Dashboard extends Component {

  render(){
    if (!this.props.loggedIn) {
      this.props.history.push('/');
      return null;
    }else{
      return (
        <Fragment>
          <ActiveRooms />
          <JoinRandomRoom />
          <h3>Do you want to start a new Pat (chatroom)?</h3>
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
  