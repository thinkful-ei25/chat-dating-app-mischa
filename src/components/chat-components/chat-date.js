import React, {Component} from 'react';
import ChatArea from './chatArea';
import Dashboard from './dashboard';
import RegistrationPage from '../auth-components/registration-page';
import LoginForm from '../auth-components/login-form';
import LandingPage from '../auth-components/landingPage';
import {Route, withRouter, Redirect} from 'react-router-dom';
import '../../css/chat-date.css';



import {connect} from 'react-redux';



//componentdidmount()
// dispatch(stillLoggedIn())
//in the server -- have interval if something's not there update database to false
//look into react websockets -- 
export class Chat extends Component {
  
  render() {
    return(
      <div className="container box">
        <Redirect exact path="/chat-room/" to="/"/>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/chat-area' component={ChatArea} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/chat-room/:newRoom" component={ChatArea} />
      </div>
      
    )
  }
}
const mapStateToProps = (state) => 
{
  return ({
  loggedIn: state.auth.currentUser ? state.auth.currentUser.loggedIn : null,
  inChatroom: state.chatRoom ? 
    state.chatRoom.users.filter(user => user.id === state.auth.currentUser.id) : null
})}
export default withRouter(connect(mapStateToProps)(Chat));