import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

function handleClick(account, dispatch) {
  if (account === 1) {
    return dispatch(login('demo1', '1234567890'));
  } else if (account === 2) {
    return dispatch(login('demo2', '1234567890'));
  }
}
export function DemoBtn({ demo, dispatch }) {
  return (
    <button
      onClick={() => handleClick(demo, dispatch)}
      className="button input-form login-btn"
    >
      Demo {demo}
    </button>
  );
}

export default connect()(DemoBtn);
