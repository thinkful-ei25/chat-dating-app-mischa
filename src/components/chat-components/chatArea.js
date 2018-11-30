import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMessages }  from '../../actions/chat';
import LeaveChatRoom from './leaveRoom';
import Input from './input';
import Logout from './logout';
import Questions from './questions';
import {withRouter} from 'react-router-dom';
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


  //stop polling server on sign out
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  renderComponents(){
    const isActive = this.props.active;
    const numberOfUsers = this.props.activeUsers.length;

      if ((numberOfUsers === 1) && isActive){
        return (
          <div>just waiting for someone to join!</div>
        )
      }else if((numberOfUsers === 1) && !isActive){
        console.log('state when user leaves room: ', this.props.state);
          return (
            <div>Oh no! User left!</div>
          )
      }else if ((numberOfUsers === 2) && isActive){
        return(
          <Fragment>
            <Questions />
            
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
      <tr key={message.id}>
      {/* <th>  header*/}
        <td className={message.userName === this.props.username ? "me user" : "partner user"}>
          <span>{message.userName}:</span> 
        </td>
        <td>
          <span>{message.message}</span>
        </td>
        
      </tr>
      )
    })

    const users = this.props.activeUsers.map((user, idx) => {
      return (
        <tr>
          <td key={idx}>
            <span>{user.username}</span>
          </td>
        </tr>
       
      )
    })
    return(
      <Fragment>
        <div>
          <section className="users">
            <table >
              {this.props.users.length > 1 ? 'users': 'user'} : {users}
            </table>
         </section>
         <section className="chat-area">
            <table className="messages">
              {chatMessages}
            </table>

         
         </section>
         
         
          {/* if active but one user then show -- waiting for user 
            if active and two users then we're gold! let's chat
            if not ative and one user then turn off chat 
          */}
          {this.renderComponents()}

        </div>

        <span>
          <LeaveChatRoom />
        </span>
        
        <span>
          <Logout /> 
        </span>
      </Fragment>
    )
  }
}

const mapStatetoProps = (state) => {
  return ({
    state,
    messages: state.chat.chatWindow,
    loggedIn: state.auth.currentUser ? state.auth.currentUser.loggedIn : null,
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
    // usersInRoom: state.chatroom.users,
    activeUsers: state.chatroom.activeUsers,
    jwt: state.auth.authToken,
    roomId: state.chatroom.roomId,
    url: state.chatroom.roomUrl,
    questions: state.chatroom.questions,
    users: state.chatroom.users,
    active: state.chatroom.activeRoom
  })
}
export default withRouter(connect(mapStatetoProps)(ChatArea));