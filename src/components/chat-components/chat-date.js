import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import ChatArea from './chatArea';
import Dashboard from '../dashboard-components/dashboard';
import NavBar from '../auth-components/nav-bar';
import RegistrationPage from '../auth-components/registration-page';
import LoginPage from '../auth-components/login-page';
import LandingPage from '../auth-components/landingPage';
import NoMatch from './404';

import './chat-date.css';

import { connect } from 'react-redux';
//add listener for when screen is 600px --> set state to isMobile
// --> action(isMobile())
export class Chat extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div className="container box">
        <NavBar loggedIn={loggedIn} />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/chat-area" component={ChatArea} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/chat-room/:newRoom" component={ChatArea} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser ? state.auth.currentUser.loggedIn : null,
  };
};
export default withRouter(connect(mapStateToProps)(Chat));
