import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {leaveChatRoom} from '../../actions/chat-room';
import {overlay} from '../../actions/auth';
import InfoOverlay from './infoOverlay';

import './nav-bar.css';
export class NavBar extends Component {
  onClickHandler(){
    if(this.props.inRoom){
      this.props.dispatch(leaveChatRoom(this.props.history))
    }
    return this.props.history.push('/'); 
  }
  onInfoClickHandler(){
    this.props.dispatch(overlay(true));
  }
  
  render(){
    console.log(this.props.overlay);
    return(
    <nav>
      <button aria-label="home" className='navButton home' onClick={()=>this.onClickHandler()}>
      FLAMINGLE
      </button>
      <button id="infoOverlay" className='navButton' onClick={()=> {
        this.onInfoClickHandler()}}>HELP</button>
      <InfoOverlay />
    </nav>
   
    )
  }
}

const mapStateToProps = (state) => ({
  inRoom : state.chatroom.roomUrl,
  overlay : state.auth.overlay
})
export default withRouter(connect(mapStateToProps)(NavBar));