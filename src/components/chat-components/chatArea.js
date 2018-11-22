import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchMessages}  from '../../actions/chat';
// import {logout} from '../../actions/auth';
import Input from './input';
import Logout from './logout';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';
//import jquery --> use .ajax methoed https://stackoverflow.com/questions/4945932/window-onbeforeunload-ajax-request-in-chrome/20322988#20322988
//window.addEventListener('unload', function() {// Make AJAX request})
// window.addEventListener('beforeUnload', function() {// Make AJAX request})

export class ChatArea extends Component {
  constructor(props){
    super(props);
    this._wasPageCleanedUp = false;
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
    // console.log(this.props.loggedIn);
    this.interval = setInterval(() => {
      // console.log('room id from chatarea:', this.props.roomId);
      this.props.dispatch(fetchMessages({roomId: this.props.roomId}));
    }, 1000 * 60)
    
    //logout automatically if user closes window (don't remove authkey)
      window.onbeforeunload = function () {
        this.logOutOnClose();
   
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
    if (this.props.users === null) {
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
          <Logout /> 
        </div>
      </Fragment>
    )
  }
}

const mapStatetoProps = (state) => {
  return ({
    messages: state.chat.chatWindow,
    users: state.auth.currentUser,
    roomId: state.chatroom.roomId
  })
}
export default connect(mapStatetoProps)(ChatArea)