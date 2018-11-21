import {API_BASE_URL} from '../config';
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
        method: 'POST',
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