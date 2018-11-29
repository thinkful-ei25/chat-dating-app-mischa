import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { overlay } from '../../actions/auth';

import './infoOverlay.css';
export class InfoOverlay extends Component {

  onClickHandler(){
    this.props.dispatch(overlay(false));
  }
  
  render(){
    return(
    <div className={!this.props.overlay ? "hide" : 'show'}  onClick={() => this.onClickHandler()}>
      <section className={"overlay"}>
        <h2> What is it </h2>
        <article>
          Flamingle is a dating app for those of us with severe social anxiety!
          Don't worry about running out of things to say, or questions to ask, because it comes preloaded
          with a set of fun, interesting and inspiring conversation starters! 
          All you have to do is login and look to see if anyone is waiting for a date. If they are, hit the 'Join room!' 
          and meet your date! If not, start a room and wait for someone to join!
          Once you're rolling, scroll through preloaded questions or just type something into the chat!
        </article>
      </section>
     
    </div>
   
    )
  }
}

const mapStateToProps = (state) => ({
  overlay: state.auth.overlay
})
export default connect(mapStateToProps)(InfoOverlay);