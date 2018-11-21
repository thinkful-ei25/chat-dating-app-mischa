import React, {Component} from 'react';
import {postMessage}  from '../../actions/chat';
import {connect} from 'react-redux';

export class Input extends Component {

  render() {
    return(
      <form onSubmit={
        (e) => {
          e.preventDefault();
          this.props.dispatch(postMessage({user: this.props.username, message: this.chat.value}));
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
  // console.log(state.auth.currentUser.username);
  return (
    {username: state.auth.currentUser.username}
  )}
export default connect(mapStateToProps)(Input);