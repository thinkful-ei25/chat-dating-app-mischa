
import {API_BASE_URL} from '../config';

export const FETCHMESSAGES = 'FETCHMESSAGES';
export const fetchMessagesRequest = () => ({
  type: FETCHMESSAGES
});
export const FETCHMESSAGESSSUCCESS = 'FETCHMESSAGESSUCCESS';
export const fetchMessagesSuccess = (messagesList) => {
  // console.log('message list: ', messagesList)
  return({
  type: FETCHMESSAGESSSUCCESS,
  messagesList
  })
};
export const FETCHMESSAGESERROR = 'FETCHMESSAGESERROR';
export const fetchMessagesError = (err) => ({
  type: FETCHMESSAGESERROR,
  err
});

export const fetchMessages = () => (dispatch, getState) => {
  // console.log(API_BASE_URL);
  dispatch(fetchMessagesRequest());
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/chat-window/`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        dispatch(fetchMessagesSuccess(data))

      })
        .catch(err => dispatch(fetchMessagesError(err)))
  )
}

export const postMessage = message => (dispatch, getState) => {
  // const updatedMessage = `anon says: ${message}`;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/chat-window`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(message)
      // body: 'message'
  })
      .then(res => {
        // res.json();
        dispatch(fetchMessages());
      })
      .catch(err => {
          console.log(err);
          const {reason} = err;
          dispatch(fetchMessagesError(reason));
      })  
};

export const NEWCHATROOMREQUEST = 'NEWCHATROOMREQUEST';
export const newChatRoomRequest = () =>  ({type: NEWCHATROOMREQUEST});

export const NEWCHATROOMSUCCESS = 'NEWCHATROOMSUCCESS';
export const newChatRoomSuccess = () =>  ({type: NEWCHATROOMSUCCESS});

export const NEWCHATROOMFAILURE = 'NEWCHATROOMFAILURE';
export const newChatRoomFailure = () =>  ({type: NEWCHATROOMFAILURE});

export const startChatRoom = () => (dispatch, getState) => {
  dispatch(newChatRoomRequest());
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/chat-room/`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`}
      })
      .then(response => {
        return response.json();
      })
      .then(() => {
        // console.log(data);
        dispatch(newChatRoomSuccess())

      })
        .catch(err => dispatch(newChatRoomFailure(err)))
  )
}