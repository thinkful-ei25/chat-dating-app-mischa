import React, {Component} from 'react';
import {postMessage}  from '../../actions/chat';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
        <input type="text" placeholder="chat!" ref={input => this.chat = input} />
            
        <input type="submit" value="send"/>
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