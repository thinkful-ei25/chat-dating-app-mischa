import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMessages }  from '../../actions/chat';
import LeaveChatRoom from './leaveRoom';
import {logout}  from '../../actions/auth';
import {leaveChatRoom} from '../../actions/chat-room';
import Beforeunload from 'react-beforeunload';
import {stillActive} from '../../actions/auth';
import Input from './input';
import Send from './sendQuestion';
import Logout from './logout';
import Questions from './questions';
import {withRouter} from 'react-router-dom';
import {API_BASE_URL} from '../../config';
import '../../css/chatArea.css'
import $ from 'jquery';

//import jquery --> use .ajax methoed https://stackoverflow.com/questions/4945932/window-onbeforeunload-ajax-request-in-chrome/20322988#20322988
//window.addEventListener('unload', function() {// Make AJAX request})
// window.addEventListener('beforeUnload', function() {// Make AJAX request})

export class ChatArea extends Component {
  constructor(props){
    super(props);
    this._wasPageCleanedUp = false;
  }  

  onUnload() {
    
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/chat-room/leave-room",
        headers: {url: this.props.url, Authorization: `Bearer ${this.props.jwt}` },
        async: false,
        
    });
}

  componentDidMount(){
    const roomUrl = this.props.location.pathname;
    this.props.dispatch(fetchMessages(roomUrl));
    this.interval = setInterval(() => {
      this.props.dispatch(fetchMessages(roomUrl));
    }, 10 * 60)    
    window.onbeforeunload = this.onUnload.bind(this);
  }


  //stop pigging db on sign out
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  renderComponents(){
    const isActive = this.props.active;
    const numberOfUsers = this.props.users.length;

      if ((numberOfUsers === 1) && isActive){
        return (
          <div>just waiting for someone to join!</div>
        )
      }else if((numberOfUsers === 1) && !isActive){
          return (
            <div>Oh no! User left!</div>
          )
      }else if ((numberOfUsers === 2) && isActive){
        return(
          <Fragment>
            <Questions /> <Send /> 
            
            <Input />    
          </Fragment>
          
        )
      }    
  }
  render() {
    if (!this.props.loggedIn) {
      this.props.history.push('/');
      return null;
    }
    const chatMessages = this.props.messages.map((message) => {
      return (
      <li key={message.id}>
        <span>{message.userName}:</span> 
        <span>{message.message}</span>
      </li>
      )
    })

    const users = this.props.usersInRoom.map((user, idx) => {
      return (
        <li key={idx}>
          {user.username}
        </li>
      )
    })
    return(
      <Fragment>
        <div>
          <section className="users">
            <ul >
              {this.props.users.length > 1 ? 'users': 'user'} : {users}
            </ul>
         </section>
         <section className="chat-area">
            <ul className="messages">
              {chatMessages}
            </ul>

         
         </section>
         
         
          {/* if active but one user then show -- waiting for user 
            if active and two users then we're gold! let's chat
            if not ative and one user then turn off chat 
          */}
          {this.renderComponents()}

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
    loggedIn: state.auth.currentUser ? state.auth.currentUser.loggedIn : null,
    usersInRoom: state.chatroom.users,
    jwt: state.auth.authToken,
    asker: state.chatroom.asker,
    roomId: state.chatroom.roomId,
    url: state.chatroom.roomUrl,
    questions: state.chatroom.questions,
    users: state.chatroom.users,
    active: state.chatroom.activeRoom
  })
}
export default withRouter(connect(mapStatetoProps)(ChatArea));