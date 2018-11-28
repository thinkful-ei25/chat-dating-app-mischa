import React,{Component} from 'react';
import {connect} from 'react-redux';
import {joinRoom} from '../../actions/chat-room';
import {withRouter} from 'react-router-dom';
import {arrayIsEmpty} from '../../utils';
export class JoinRandomRoom extends Component {
  onClickHandler(){

      const num = Math.floor(Math.random()*this.props.activeRooms.length);
      const {url} = this.props.activeRooms[num];

      // const {url} = roomUrl;
      this.props.dispatch(joinRoom(this.props.history, url));
  }
  render(){
  
    if(arrayIsEmpty(this.props.activeRooms)){
      return (
        <h3>
          No active chats! Maybe you should start one :-O 
        </h3>
      )
    }else{
      return(
        <button onClick={() => this.onClickHandler()}>Join a room!</button>
      )
    }
  }
}
const mapStatetoProps = (state) => {
  return {
      activeRooms: state.dashboard ? state.dashboard.activeRooms.filter(room => room.users.length < 2) : null
  };
}
export default withRouter(connect(mapStatetoProps)(JoinRandomRoom));