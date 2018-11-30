import {
  NEWCHATROOMREQUEST, NEWCHATROOMSUCCESS, NEWCHATROOMFAILURE, 
  JOINCHATROOMREQUEST, JOINCHATROOMSUCCESS, JOINCHATROOMFAILURE,
  LEAVECHATROOMREQUEST, LEAVECHATROOMSUCCESS, LEAVECHATROOMFAILURE,
  REFRESHCHATROOMSTATE,
  DEACTIVATEROOM,

  DISPLAYPREVIOUSNEXTQUESTION
} 
from '../actions/chat-room'
import { arrayIsEmpty, shuffle } from '../utils';

const initialState={
  loading: false,
  joinChatLoading: false,
  leaveChatLoading: false,
  err: null,
  users: [],
  activeUsers: [],
  roomUrl : null,
  roomId: null,
  activeRoom: false,
  questions: [],
  questionNumberToDisplay: 0,
  waitingForPartner: false
}

function reducer(state=initialState, action) {
  console.log('state in chatroom reducer:', state, action);
  switch(action.type){

    case NEWCHATROOMREQUEST:
      return  {...state, loading: true}

    case NEWCHATROOMSUCCESS:
      return  {
        ...state,
        loading: false,  
        users: [action.userId],
        activeUsers: [action.userId],
        /* chatWindow: action.messagesList, */  
        err: null,
        roomUrl: action.roomUrl,
        roomId: action.roomId,
        questions: shuffle(action.questions),
        activeRoom: true,
        waitingForPartner: true
      }

    case NEWCHATROOMFAILURE: 
      return {...state, loading: false, err: action.err}
    
    case JOINCHATROOMREQUEST: 
      return {...state, joinChatLoading: true}
    
    case JOINCHATROOMSUCCESS:
      return {...state, 
        joinChatLoading: false, 
        users: [...state.users, action.userId],
        activeUsers: [...state.users, action.userId],
        waitingForPartner: false,
        questions: shuffle(action.questions)
      }
    
    case LEAVECHATROOMREQUEST: 
      return  {...state, leaveChatLoading: true}
    
    case JOINCHATROOMFAILURE:
      return {...state, leaveChatLoading: false, err: action.err}
    
    case LEAVECHATROOMSUCCESS: 
      return {
        ...state, 
        loading: false, 
        activeUsers: state.users.filter((userId) => (userId !== action.userId)),
        roomUrl: null,
        roomId: null,
        active: false,
        leaveChatLoading: false,
        questions:[]
      }

    case LEAVECHATROOMFAILURE: 
       return {...state, loading: false, err: action.err }
    
    case REFRESHCHATROOMSTATE: 
       return {
         ...state,
         users: action.active ? action.users : state.users,
         activeUsers: action.users,
         roomUrl : action.roomUrl,
         roomId: action.roomId,
         activeRoom: action.active,
        }

    case DEACTIVATEROOM: 
       return arrayIsEmpty(state.users) ?  { ...state, activeRoom: false} : state

    case DISPLAYPREVIOUSNEXTQUESTION:      
        return ({...state, questionNumberToDisplay: action.questionNumberToDisplay})

    default: 
      return state;
    }
    
};
export default reducer;