
import {API_BASE_URL} from '../config';
import {refreshChatroomState} from './chat-room';

export const FETCHMESSAGES = 'FETCHMESSAGES';
export const fetchMessagesRequest = () => ({
  type: FETCHMESSAGES
});
export const FETCHMESSAGESSSUCCESS = 'FETCHMESSAGESSUCCESS';
export const fetchMessagesSuccess = (messageData, usersInRoom) => {
  return({
  type: FETCHMESSAGESSSUCCESS,
  messageData,
  usersInRoom
  })
};
export const FETCHMESSAGESERROR = 'FETCHMESSAGESERROR';
export const fetchMessagesError = (err) => ({
  type: FETCHMESSAGESERROR,
  err
});



export const fetchMessages = (url) => (dispatch, getState) => {
  dispatch(fetchMessagesRequest());
  const authToken = getState().auth.authToken;
  const usersInRoom = getState().chatroom.users;
  return (
      fetch(`${API_BASE_URL}/api/chat-window/`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`, url}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const {id, users, url, active} = data;
        dispatch(fetchMessagesSuccess(data, usersInRoom));
        dispatch(refreshChatroomState(id, users, url, active));
      })
        .catch(err => dispatch(fetchMessagesError(err)))
  )
}

export const postMessage = (messageData, url) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/api/chat-window`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
           url,
      },
      body: JSON.stringify(messageData)
      // body: 'message'
  })
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch(fetchMessages(url));
      })
      .catch(err => {
          const {reason} = err;
          dispatch(fetchMessagesError(reason));
      })  
};
