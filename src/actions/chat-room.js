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
