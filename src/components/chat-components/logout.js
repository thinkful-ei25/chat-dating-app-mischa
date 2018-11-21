import React, {Component} from 'react';
import {logout}  from '../../actions/auth';
import {connect} from 'react-redux';

export class Logout extends Component {
  logoutOnClick(){
    this.props.dispatch(logout());
  }
  render(){
    return(
      <button onClick={
        () => this.logoutOnClick()
      }>Logout</button>
      )
  }
}

export default connect()(Logout)