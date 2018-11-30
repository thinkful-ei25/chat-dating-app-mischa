import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landingPage.css'

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
   //if props.user has current chatroom then --> 
   /* update user model to include chatrooms 
   (can you access it from history?)*/
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div >
            <h2 className="title">Welcome to Flamingle!</h2>
            <article className="description">
            <p className="content">
                The hottest new dating app! It's like Tinder, but more random, less awkward,
                and until we implement more featers, you'll never have (or be able) to talk to the same person twice! 
                Hit HELP in the upper right hand corner for more details.
            </p>
            </article>
            
            <div className="auth-butn-container">
                <Link to="/login" className="button auth-btn">Login</Link>
                <span>OR</span>
                <Link to="/register" className="button auth-btn">Register</Link>
            </div>
           
        </div>
    );
}

const mapStateToProps = state => {
//   console.log(state.auth);
  return ({
    loggedIn: state.auth.currentUser !== null
  })
};

export default connect(mapStateToProps)(LandingPage);
