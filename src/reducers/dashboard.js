import {
  GETACTIVEROOMSREQUEST,
  GETACTIVEROOMSSUCCESS,
  GETACTIVEROOMSFAILURE
} 
from '../actions/dashboard'
const initialState={
  username : null,
  activeRooms: [],
  loading: false,
  err: null
}

function reducer(state=initialState, action){
  switch(action.type){
    case GETACTIVEROOMSREQUEST:
      return{...state, loading: true}
    case GETACTIVEROOMSSUCCESS:
      return {
        ...state,
        loading: false,
        activeRooms: action.activeRooms
      }
    case GETACTIVEROOMSFAILURE:
      return{...state, err: action.err}
    default:
      return state;
  }}
  export default reducer;