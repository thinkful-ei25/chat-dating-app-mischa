import React,{Component} from 'react';
import {connect} from 'react-redux';
import {leaveChatRoom} from '../../actions/chat-room';
import {withRouter} from 'react-router-dom';

export class LeaveChatRoom extends Component {

  onClickHandler(){
    this.props.dispatch(leaveChatRoom(this.props.history))
  }
  render(){
    return (
      <button className="button leave-chatroom" onClick={()=>this.onClickHandler()}>Leave Room</button>
    )
  }
}


export default withRouter(connect()(LeaveChatRoom));

