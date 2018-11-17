import React, {Component} from 'react';
import {connect} from 'react-redux';
export class ChatArea extends Component {

  render() {
    const chatMessages = this.props.messages.map((message, idx) => {
      return (
      <li key={idx}>
        <span>{message}</span>
      </li>
      )
    })
    return(
      <div>
        text
        <ul>
          {chatMessages}
        </ul>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  console.log(state);
  return ({
    messages: state.chatWindow
  })
}
export default connect(mapStatetoProps)(ChatArea)