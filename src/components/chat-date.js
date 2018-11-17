import React, {Component} from 'react';
import ChatArea from './chatArea';
import Input from './input'

export default class Chat extends Component {

  render() {
    return(
      <React.Fragment>
        <ChatArea />
        <Input /> 
      </React.Fragment>
      
    )
  }
}