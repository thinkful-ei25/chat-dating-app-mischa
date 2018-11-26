import {API_BASE_URL} from '../config';

//ACTIONS FOR GETTING LIST OF ROOMS!

export const NEWCHATROOMREQUEST = 'NEWCHATROOMREQUEST';
export const newChatRoomRequest = () =>  ({type: NEWCHATROOMREQUEST});

export const NEWCHATROOMSUCCESS = 'NEWCHATROOMSUCCESS';
export const newChatRoomSuccess = (userId, roomUrl, roomId, questions) =>  {
  return(
    {
      type: NEWCHATROOMSUCCESS,
      userId, roomUrl, roomId, questions
    }
  )
};

export const NEWCHATROOMFAILURE = 'NEWCHATROOMFAILURE';
export const newChatRoomFailure = (err) =>  (
  {
    type: NEWCHATROOMFAILURE, err
  });

export const REFRESHCHATROOMSTATE = 'REFRESHCHATROOMSTATE';
export const refreshChatroomState = (roomId, users, roomUrl) => ({
  type: REFRESHCHATROOMSTATE, 
  roomId, users, roomUrl
} )

export const JOINCHATROOMREQUEST = 'JOINCHATROOMREQUEST';
export const joinChatRoomRequest = () => ({type: JOINCHATROOMREQUEST});

export const JOINCHATROOMSUCCESS = 'JOINCHATROOMSUCESS';
export const joinChatRoomSuccess = (userId, url) => ({
  type: JOINCHATROOMSUCCESS,
  userId,
  url
});

export const JOINCHATROOMFAILURE = 'JOINCHATROOMFAILURE';
export const joinChatRoomFailure = (err) => ({ 
  type: JOINCHATROOMFAILURE,
  err
});

export const LEAVECHATROOMREQUEST = 'LEAVECHATROOMREQUEST';
export const leaveChatRoomRequest = () =>  ({type: LEAVECHATROOMREQUEST});

export const LEAVECHATROOMSUCCESS = 'LEAVECHATROOMSUCCESS';
export const leaveChatRoomSuccess = (userId) =>  {
  return(
    {
      type: LEAVECHATROOMSUCCESS,
      userId
    }
  )
};

export const LEAVECHATROOMFAILURE = 'LEAVECHATROOMFAILURE';
export const leaveChatRoomFailure = (err) =>  (
  {
    type: LEAVECHATROOMFAILURE, err
  });

export const DEACTIVATEROOM = 'DEACTIVATEROOM';
export const deactivateRoom = () => ({ type: DEACTIVATEROOM });

export const DISPLAYPREVIOUSNEXTQUESTION = 'DISPLAYPREVIOUSNEXTQUESTION';
export const displayPreviousNextQuestion = (questionNumberToDisplay) => ({
  type: DISPLAYPREVIOUSNEXTQUESTION,
  questionNumberToDisplay
})

export const startChatRoom = (history) => (dispatch, getState) => {
  dispatch(newChatRoomRequest());
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id;
  return (
      fetch(`${API_BASE_URL}/api/chat-room`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${authToken}`}
      })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then((response) => {
        const {url, id, questions: questionsObj} = response;
        const {questions} = questionsObj;
        dispatch(newChatRoomSuccess(userId, url, id, questions));
        history.push(url);
      })
        .catch(err => dispatch(newChatRoomFailure(err)))
  )
}

export const joinRoom = (history, roomUrl) => (dispatch, getState) => {
  dispatch(joinChatRoomRequest());
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id;
  return (
      fetch(`${API_BASE_URL}/api/chat-room/join-room`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({roomUrl})
      })
      .then((response) => {
        if (response.ok){
          dispatch(joinChatRoomSuccess(userId, roomUrl));
          history.push(roomUrl);
        }
      })
        .catch(err => dispatch(joinChatRoomFailure(err)))
  )
}
export const leaveChatRoom = (history) => (dispatch, getState) => {

  dispatch(leaveChatRoomRequest());
  const authToken = getState().auth.authToken;
  const roomUrl = history.location.pathname;
  const userId = getState().auth.currentUser.id;
  // console.log('the room id: ', roomId);
  return (
      fetch(`${API_BASE_URL}/api/chat-room/leave-room`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({roomUrl})
      })
      .then(response => {
        if (response.ok){
          // console.log(response);
          // console.log(history);
          history.push('/dashboard');
          dispatch(leaveChatRoomSuccess(userId));
          
          dispatch(deactivateRoom());
        }
        })
      .catch(err => dispatch(leaveChatRoomFailure(err)))
  )

}