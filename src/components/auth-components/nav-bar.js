import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { overlay } from '../../actions/auth';
import InfoOverlay from './infoOverlay';
import Logout from './logout';
import './nav-bar.css';
function onInfoClickHandler(dispatch) {
  dispatch(overlay(true));
}
export function NavBar({ dispatch, loggedIn }) {
  return (
    <nav className="nav-bar">
      <Link aria-label="home " className="home " to="/dashboard">
        <img
          className="logo"
          src="/flamingo-logo-pink.png"
          alt="flamingo logo"
        />
      </Link>
      <button
        id="infoOverlay"
        className="navButton"
        onClick={() => {
          onInfoClickHandler(dispatch);
        }}
      >
        HELP
      </button>
      {loggedIn ? <Logout /> : null}
      <InfoOverlay />
    </nav>
  );
}

export default connect()(NavBar);
