import React,{Component} from 'react';
import {connect} from 'react-redux';
import {startChatRoom} from '../../actions/chat-room';
import {withRouter, Redirect} from 'react-router-dom';

export class NewChatRoom extends Component {
  state = {
    chatRoomUrl: null,
    submitted: false
  }
  onClickHandler(){
    this.props.dispatch(startChatRoom(this.props.history))
      .then((url)=> {
        console.log(url);
        this.setState({
          submitted: true,
          chatRoomUrl: url
        })
      })
  }
  render(){
    if(this.state.submitted){
     return <Redirect to={this.state.chatRoomUrl}/>
    }
    return (
      <button onClick={()=>this.onClickHandler()}>Open Room</button>
    )
  }
}

export default withRouter(connect()(NewChatRoom));