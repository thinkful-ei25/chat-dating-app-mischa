import React, {Component} from 'react';
import ChatArea from './chatArea';
import Dashboard from './dashboard';
import RegistrationPage from '../auth-components/registration-page';
import LandingPage from '../auth-components/landingPage';
import {Route, withRouter, Redirect} from 'react-router-dom';



import {connect} from 'react-redux';

const divStyle = {
  boxSizing: "border-box",
  border: "1px solid #000",
  color: "blue",
  margin: '30px auto auto auto',
  width: '50%'

}
export class Chat extends Component {
  render() {
    return(
      <div style={divStyle}>
       <Redirect exact path="/chat-room/" to="/"/>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/chat-area' component={ChatArea} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/chat-room/:newRoom" component={ChatArea} />
      </div>
      
    )
  }
}

export default withRouter(connect()(Chat));