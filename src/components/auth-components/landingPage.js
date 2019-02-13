import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landingPage.css';
export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <h2 className="title">Welcome to Flamingle!</h2>
      <article className="description">
        <p className="content">
          The hottest new dating app. <br />
          Like Tinder but more random and less awkward
        </p>
      </article>
      <div className="auth-btn-container">
        <Link to="/login" className="button auth-btn">
          Login
        </Link>
        <Link to="/register" className="button auth-btn">
          Register
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  //   console.log(state.auth);
  return {
    loggedIn: state.auth.currentUser !== null,
  };
};

export default connect(mapStateToProps)(LandingPage);
