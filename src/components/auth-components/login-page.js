import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <h2 className="title">Login to Flamingle!</h2>

      <LoginForm />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
