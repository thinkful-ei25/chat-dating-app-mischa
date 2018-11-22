import React,{Component} from 'react';
import {connect} from 'react-redux';
import {startChatRoom} from '../../actions/chat-room';
import {withRouter} from 'react-router-dom';
// import {Link, Redirect} from 'react-router-dom';

export class NewChatRoom extends Component {
  onClickHandler(){
    this.props.dispatch(startChatRoom(this.props.history))
  }
  render(){
    return (
      <button onClick={()=>this.onClickHandler()}>Open Room</button>
    )
  }


}

export default withRouter(connect()(NewChatRoom));