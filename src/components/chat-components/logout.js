import React, {Component} from 'react';
import {logout}  from '../../actions/auth';
import {connect} from 'react-redux';
import './logout.css';
export class Logout extends Component {
  logoutOnClick(){
    this.props.dispatch(logout());
  }
  render(){
    return(
      <button className="button logout" onClick={
        () => this.logoutOnClick()
      }>Logout</button>
      )
  }
}

export default connect()(Logout)