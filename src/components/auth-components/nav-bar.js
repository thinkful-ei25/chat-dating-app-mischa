import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { overlay } from '../../actions/auth';
import InfoOverlay from './infoOverlay';

import './nav-bar.css';
function onInfoClickHandler(dispatch) {
  dispatch(overlay(true));
}
export function NavBar({ dispatch }) {
  return (
    <nav className="nav-bar">
      <Link aria-label="home " className="home " to="/dashboard">
        <img className="logo" src="/flamingo-logo.png" alt="flamingo logo" />
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
      <InfoOverlay />
    </nav>
  );
}

export default connect()(NavBar);
