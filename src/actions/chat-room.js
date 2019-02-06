import { API_BASE_URL } from '../config';

export const USERJOINED = 'USERJOINED';
export const userJoined = users => ({
  type: USERJOINED,
  users,
});
//ACTIONS FOR GETTING LIST OF ROOMS!

export const NEWCHATROOMREQUEST = 'NEWCHATROOMREQUEST';
export const newChatRoomRequest = () => ({ type: NEWCHATROOMREQUEST });

export const NEWCHATROOMSUCCESS = 'NEWCHATROOMSUCCESS';
export const newChatRoomSuccess = (userId, roomUrl, roomId, questions) => {
  return {
    type: NEWCHATROOMSUCCESS,
    userId,
    roomUrl,
    roomId,
    questions,
  };
};

export const NEWCHATROOMFAILURE = 'NEWCHATROOMFAILURE';
export const newChatRoomFailure = err => ({
  type: NEWCHATROOMFAILURE,
  err,
});

export const REFRESHCHATROOMSTATE = 'REFRESHCHATROOMSTATE';
export const refreshChatroomState = (roomId, users, roomUrl, active) => {
  return {
    type: REFRESHCHATROOMSTATE,
    roomId,
    users,
    roomUrl,
    active,
  };
};

export const JOINCHATROOMREQUEST = 'JOINCHATROOMREQUEST';
export const joinChatRoomRequest = () => ({ type: JOINCHATROOMREQUEST });

export const JOINCHATROOMSUCCESS = 'JOINCHATROOMSUCESS';
export const joinChatRoomSuccess = (userId, url, questions) => ({
  type: JOINCHATROOMSUCCESS,
  userId,
  url,
  questions,
});

export const JOINCHATROOMFAILURE = 'JOINCHATROOMFAILURE';
export const joinChatRoomFailure = err => ({
  type: JOINCHATROOMFAILURE,
  err,
});

export const DEACTIVATEROOM = 'DEACTIVATEROOM';
export const deactivateRoom = data => ({ type: DEACTIVATEROOM, data });

export const DISPLAYPREVIOUSNEXTQUESTION = 'DISPLAYPREVIOUSNEXTQUESTION';
export const displayPreviousNextQuestion = questionNumberToDisplay => ({
  type: DISPLAYPREVIOUSNEXTQUESTION,
  questionNumberToDisplay,
});

export const IMPORTQUESTIONS = 'IMPORTQUESTIONS';
export const importQuestions = questions => ({
  type: IMPORTQUESTIONS,
  questions,
});
export const startChatRoom = () => (dispatch, getState) => {
  dispatch(newChatRoomRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/chat-room`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      const { url } = response;
      return url;
    })
    .catch(err => {
      console.log(err);
      dispatch(newChatRoomFailure(err));
    });
};

export const joinRoom = (history, url) => (dispatch, getState) => {
  // console.log(roomUrl);
  dispatch(joinChatRoomRequest());
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id;
  return fetch(`${API_BASE_URL}/api/chat-room/join-room`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      url,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(response => {
      //get questions from server and put them in state
      const { questions } = response;
      dispatch(joinChatRoomSuccess(userId, url, questions));
      history.push(url);
    })
    .catch(err => dispatch(joinChatRoomFailure(err)));
};
