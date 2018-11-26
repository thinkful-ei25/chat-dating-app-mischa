import {
  NEWCHATROOMREQUEST, NEWCHATROOMSUCCESS, NEWCHATROOMFAILURE, 
  JOINCHATROOMREQUEST, JOINCHATROOMSUCCESS, JOINCHATROOMFAILURE,
  LEAVECHATROOMREQUEST, LEAVECHATROOMSUCCESS, LEAVECHATROOMFAILURE,
  
  REFRESHCHATROOMSTATE,
  DEACTIVATEROOM,

  DISPLAYPREVIOUSNEXTQUESTION
} 
from '../actions/chat-room'

import { arrayIsEmpty } from '../utils';

const initialState={
  loading: false,
  err: null,
  users: [],
  roomUrl : null,
  roomId: null,
  activeRoom: false,
  questions: [],
  questionNumberToDisplay: 0,
  asker: null,
}

function reducer(state=initialState, action) {
  switch(action.type){

    case NEWCHATROOMREQUEST:
      return  {...state, loading: true}

    case NEWCHATROOMSUCCESS:
      return  {
        ...state,
        loading: false,  
        users: [action.userId],
        /* chatWindow: action.messagesList, */  
        err: null,
        roomUrl: action.roomUrl,
        roomId: action.roomId,
        questions: action.questions,
        activeRoom: true,
        asker: action.userId,
      }

    case NEWCHATROOMFAILURE: 
      return {...state, loading: false, err: action.err}
    
    case JOINCHATROOMREQUEST: 
      return {...state, loading: true}
    
    case JOINCHATROOMSUCCESS:
      return {...state, loading: false, users: [...state.users, action.userId]}
    
    case LEAVECHATROOMREQUEST: 
      return  {...state, loading: true}
    
    case JOINCHATROOMFAILURE:
      return {...state, loading: false, err: action.err}
    
    case LEAVECHATROOMSUCCESS: 
      return {
        ...state, 
        loading: false, 
        users: state.users.filter((userId) => (userId !== action.userId)),
        roomUrl: null,
        roomId: null
      }

    case LEAVECHATROOMFAILURE: 
       return {...state, loading: false, err: action.err }
    
    case REFRESHCHATROOMSTATE: 
       return {
         ...state,
         users: action.users,
         roomUrl : action.roomUrl,
         roomId: action.roomId,
         activeRoom: true
        }
     
    case DEACTIVATEROOM: 
       return arrayIsEmpty(state.users) ?  { ...state, activeRoom: false } : state

    case DISPLAYPREVIOUSNEXTQUESTION:      
        return ({...state, questionNumberToDisplay: action.questionNumberToDisplay})

    default: 
      return state;
    }
    
};
export default reducer;