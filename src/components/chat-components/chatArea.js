import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMessages }  from '../../actions/chat';
import LeaveChatRoom from './leaveRoom';
// import { logOutOnClose, leaveRoom } from '../../utils'
// import {logout} from '../../actions/auth';
import $ from 'jquery';
import Input from './input';
import Logout from './logout';
import {Redirect, withRouter} from 'react-router-dom';

//import jquery --> use .ajax methoed https://stackoverflow.com/questions/4945932/window-onbeforeunload-ajax-request-in-chrome/20322988#20322988
//window.addEventListener('unload', function() {// Make AJAX request})
// window.addEventListener('beforeUnload', function() {// Make AJAX request})

export class ChatArea extends Component {
  constructor(props){
    super(props);
    this._wasPageCleanedUp = false;
  }  
  //logout when user closes window but do not remove authtoken
  leaveRoom(){
    if (!this._wasPageCleanedUp){
      $.ajax({
        type: 'PUT',
        async: false,
        url: 'http://localhost:8080/api/leave-room',
        success: () =>  this._wasPageCleanedUp = true
        });
    }
    }
    logOutOnClose(){
      if (!this._wasPageCleanedUp){
        $.ajax({
          type: 'POST',
          async: false,
          url: 'http://localhost:8080/auth/logout',
          success: () =>  this._wasPageCleanedUp = true
          });
      }
      }

  componentDidMount(){
    const roomUrl = this.props.location.pathname;
    this.props.dispatch(fetchMessages(roomUrl));
    this.interval = setInterval(() => {
      this.props.dispatch(fetchMessages());
    }, 1000 * 60)

    //logout automatically if user closes window (don't remove authkey)
      window.onbeforeunload = function () {
        this.leaveRoom();
        this.logOutOnClose();
        // this.props.dispatch(leaveRoom(this.props.userId));
   
   };
  };

  //stop pigging db on sign out
  componentWillUnmount(){
    clearInterval(this.interval);
    // this.props.dispatch(logout());
  }

  // startPeriodicRefresh() {
  //   setInterval(
  //       () => this.props.dispatch(fetchMessages()),
  //       1000
  //   );

  render() {
    //while null have loading 
    if (!this.props.userId) {
      return <Redirect to="/" />;
    }
    const chatMessages = this.props.messages.map((message) => {
      return (
      <li key={message.id}>
        <span>{message.userName}: {message.message}</span>
      </li>
      )
    })
    return(
      <Fragment>
        <div>
            Messages

          <ul style={{"listStyleType": "none"}}>
            {chatMessages}
          </ul>

          <Input /> 

        </div>

        <div>
          <LeaveChatRoom />
        </div>
        
        <div>
          <Logout /> 
        </div>
      </Fragment>
    )
  }
}

const mapStatetoProps = (state) => {
  return ({
    messages: state.chat.chatWindow,
    userId: state.auth.currentUser ? state.auth.currentUser.id : null,
    roomId: state.chatroom.roomId
  })
}
export default withRouter(connect(mapStatetoProps)(ChatArea));