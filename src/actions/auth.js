import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import { refreshChatroomState, importQuestions } from './chat-room';

export const OVERLAY = 'OVERLAY';
export const overlay = boolean => ({
  type: OVERLAY,
  boolean,
});

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser,
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error,
});

export const STAY_LOGGEDIN = 'STAY_LOGGEDIN';
export const stayLoggedIn = () => ({
  type: STAY_LOGGEDIN,
});
export const LOGOUT_WARNING = 'LOGOUT_WARNING';
export const logoutWarning = warning => ({
  type: LOGOUT_WARNING,
  warning,
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  decodedToken.user.loggedIn = true;
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
};
//make action that sets current user to loggedin: false ==> export it to chat compomnent call inside of window function (line 40)

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      // Reject any requests which don't return a 200 status, creating
      // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({ authToken, questions }) => {
        storeAuthInfo(authToken, dispatch);
        dispatch(importQuestions(questions));
      })
      .catch(err => {
        const { code } = err;
        const message =
          code === 401
            ? 'Incorrect username or password'
            : 'Unable to login, please try again';
        dispatch(authError(err));
        // Could not authenticate, so return a SubmissionError for Redux
        // Form
        return Promise.reject(
          new SubmissionError({
            _error: message,
          })
        );
      })
  );
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken, questions }) => {
      storeAuthInfo(authToken, dispatch);
      dispatch(importQuestions(questions));
    })
    .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
    });
};
//change
export const logout = (tabClosed = false) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'GET',
    headers: {
      // Send authToken to logout with

      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(response => {
      if (response.ok && !tabClosed) {
        clearAuthToken();
        dispatch(clearAuth());
        dispatch(refreshChatroomState());
        // dispatch(logoutFrontEnd());
      }
    })
    .catch(err => dispatch(authError(err)));
};
