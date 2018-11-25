
import {API_BASE_URL} from '../config';
import {refreshChatroomState} from './chat-room';

export const FETCHMESSAGES = 'FETCHMESSAGES';
export const fetchMessagesRequest = () => ({
  type: FETCHMESSAGES
});
export const FETCHMESSAGESSSUCCESS = 'FETCHMESSAGESSUCCESS';
export const fetchMessagesSuccess = (messageData) => {
  return({
  type: FETCHMESSAGESSSUCCESS,
  messageData
  })
};
export const FETCHMESSAGESERROR = 'FETCHMESSAGESERROR';
export const fetchMessagesError = (err) => ({
  type: FETCHMESSAGESERROR,
  err
});

export const fetchMessages = (path) => (dispatch, getState, location) => {
  dispatch(fetchMessagesRequest());
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/chat-window/`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`, path}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const {id, users, url} = data;
        dispatch(fetchMessagesSuccess(data));
        dispatch(refreshChatroomState(id, users, url));
      })
        .catch(err => dispatch(fetchMessagesError(err)))
  )
}

export const postMessage = (messageData) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/chat-window`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(messageData)
      // body: 'message'
  })
      .then(res => {
        // res.json();
        dispatch(fetchMessages(messageData.path));
      })
      .catch(err => {
          const {reason} = err;
          dispatch(fetchMessagesError(reason));
      })  
};
