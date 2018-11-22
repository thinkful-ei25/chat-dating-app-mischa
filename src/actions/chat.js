
import {API_BASE_URL} from '../config';

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

export const fetchMessages = () => (dispatch, getState) => {
  const state = getState();
  const roomId = state.chatroom.roomId;
  dispatch(fetchMessagesRequest());
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/chat-window/`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`, roomId}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        dispatch(fetchMessagesSuccess(data))
      })
        .catch(err => dispatch(fetchMessagesError(err)))
  )
}

export const postMessage = (messageData) => (dispatch, getState) => {
  // const updatedMessage = `anon says: ${message}`;
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
        dispatch(fetchMessages());
      })
      .catch(err => {
          const {reason} = err;
          dispatch(fetchMessagesError(reason));
      })  
};
