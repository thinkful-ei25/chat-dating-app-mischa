import {
  NEWCHATROOMREQUEST,
  NEWCHATROOMSUCCESS,
  NEWCHATROOMFAILURE
} 
from '../actions/chat-room'
const initialState={
 /*  chatWindow : [], */
  loading: false,
  err: null,
  users: [],
  roomUrl : '',
  roomId: ''
}

function reducer(state=initialState, action) {
  switch(action.type){
    case NEWCHATROOMREQUEST:
      return  {...state, loading: true}

  case NEWCHATROOMSUCCESS:
      return  {
        loading: false,  
        users: state.users.push(action.userId),
        /* chatWindow: action.messagesList, */  
        err: null,
        roomUrl: action.roomUrl,
        roomId: action.roomId
      }
    
    case NEWCHATROOMFAILURE: 
      return {...state, loading: false, err: action.err}
    default: 
      return state;
  }
};
export default reducer;