import React, {Component} from 'react';
import {postMessage}  from '../../actions/chat';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './input.css';
export class Input extends Component {

  render() {
    const roomUrl = this.props.location.pathname;
    return(
      <form onSubmit={

        (e) => {
          e.preventDefault();
          this.props.dispatch(postMessage(
            {
              username: this.props.username, 
              userId: this.props.userId,
              roomId: this.props.roomId,
              message: this.chat.value,
            },roomUrl)
            );
          this.chat.value = '';
        }
      }>
        <input classname="messages" style={{width: '85%', marginRight:'10px'}} type="text" placeholder="chat!" ref={input => this.chat = input} />
            
        <button className="button" type="submit" >send</button>
      </form>
    )
  }
}
const mapStateToProps = (state) => {
  return (
    {
      userId: state.auth.currentUser ? state.auth.currentUser.id : null,
      username: state.auth.currentUser ? state.auth.currentUser.username : null,
      roomId: state.chatroom.roomId
    }
  )}
export default withRouter(connect(mapStateToProps)(Input));