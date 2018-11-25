import {API_BASE_URL} from '../config';

export const GETACTIVEROOMSREQUEST = 'NEWCHATROOMREQUEST';
export const getActiveRoomsRequest = () => ({type: GETACTIVEROOMSREQUEST});

export const GETACTIVEROOMSSUCCESS = 'GETACTIVEROOMSSUCCESS';
export const getActiveRoomsSuccess = (activeRooms) => ({
    type: GETACTIVEROOMSSUCCESS,
    activeRooms
  });

export const GETACTIVEROOMSFAILURE = 'GETACTIVEROOMSFAILURE';
export const getActiveRoomsFailure = (err) => ({
  type: GETACTIVEROOMSFAILURE,
  err
})

export const getActiveRooms = () => (dispatch, getState) => {
  dispatch(getActiveRoomsRequest());
  const authToken = getState().auth.authToken;
  return (
      fetch(`${API_BASE_URL}/api/chat-rooms-list`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${authToken}`}
      })
      .then(response => {

        return response.json();
      })
      .then((response) => {
        const url = response.result.map(item => item.url);
        dispatch(getActiveRoomsSuccess(url));
        // history.push(url);
      })
        .catch(err => dispatch(getActiveRoomsFailure(err)))
  )
}
