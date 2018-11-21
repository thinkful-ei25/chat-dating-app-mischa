import React,{Component} from 'react';
import {connect} from 'react-redux';
import {startChatRoom} from '../../actions/chat';
// import {Link, Redirect} from 'react-router-dom';

export class NewChatRoom extends Component {
  onClickHandler(){
    this.props.dispatch(startChatRoom())
  }
  render(){
    return (
      <button onClick={()=>this.onClickHandler()}>Open Room</button>
    )
  }


}

export default connect()(NewChatRoom)