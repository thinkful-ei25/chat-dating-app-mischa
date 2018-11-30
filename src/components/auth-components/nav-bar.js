import React, { Component } from 'react';
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
    
    return(
    <nav>
      <button aria-label="home " className='home ' onClick={()=>this.onClickHandler()}>
      {/* <div className='logo' style={divStyle}> */}
      FLAM
      <img className="logo" src="/flamingo-logo.png" alt="flamingo logo" ></img>
      {/* </div> */}
      NGLE
      </button>
      <button id="infoOverlay" className='navButton' onClick={()=> {
        this.onInfoClickHandler()}}>HELP</button>
      <InfoOverlay />
    </nav>
   
    )
  }
}

const mapStateToProps = (state) => ({
  inRoom : state.chatroom.active,
  overlay : state.auth.overlay
})
export default withRouter(connect(mapStateToProps)(NavBar));