import React,{Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ActiveRooms from '../dashboard-components/active-rooms';
import JoinRandomRoom from '../dashboard-components/join-random-room';
import NewChatRoom from './newChatRoomBtn';
import { logOutOnClose } from '../../utils';
import {withRouter} from 'react-router-dom';


export class Dashboard extends Component {
  componentDidMount(){
    //logout automatically if user closes window (don't remove authkey)
    window.onbeforeunload = function () {
      logOutOnClose(this._wasPageCleanedUp);   
   };
  };
  
  render(){
    console.log(this.props.loggedIn);
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
        </Fragment>
      )
    }
  }
}
      

const mapStateToProps = state => {
  console.log(state);
    return ({
      loggedIn: state.auth.currentUser !== null
    })
  };
  
  export default withRouter(connect(mapStateToProps)(Dashboard));
  