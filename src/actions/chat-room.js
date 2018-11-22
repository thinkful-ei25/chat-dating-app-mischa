import {API_BASE_URL} from '../config';
export const NEWCHATROOMREQUEST = 'NEWCHATROOMREQUEST';
export const newChatRoomRequest = () =>  ({type: NEWCHATROOMREQUEST});

export const NEWCHATROOMSUCCESS = 'NEWCHATROOMSUCCESS';
export const newChatRoomSuccess = (userId, roomUrl, roomId) =>  {
  return(
    {
      type: NEWCHATROOMSUCCESS,
      userId,
      roomUrl,
      roomId
    }
  )
};

export const NEWCHATROOMFAILURE = 'NEWCHATROOMFAILURE';
export const newChatRoomFailure = (err) =>  (
  {
    type: NEWCHATROOMFAILURE, err
  });

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
        const {url, id} = response;
        console.log(getState());
        dispatch(newChatRoomSuccess(userId, url, id));
        history.push(url);
      })
        .catch(err => dispatch(newChatRoomFailure(err)))
  )
}