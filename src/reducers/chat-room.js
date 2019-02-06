import {
  NEWCHATROOMREQUEST,
  NEWCHATROOMSUCCESS,
  NEWCHATROOMFAILURE,
  JOINCHATROOMREQUEST,
  JOINCHATROOMSUCCESS,
  JOINCHATROOMFAILURE,
  REFRESHCHATROOMSTATE,
  DEACTIVATEROOM,
  DISPLAYPREVIOUSNEXTQUESTION,
  USERJOINED,
  IMPORTQUESTIONS,
} from '../actions/chat-room';
import { arrayIsEmpty, shuffle } from '../utils';

const initialState = {
  loading: false,
  joinChatLoading: false,
  leaveChatLoading: false,
  err: null,
  user1: null,
  user2: null,
  activeUsers: [],
  roomUrl: null,
  roomId: null,
  activeRoom: false,
  questions: null,
  questionNumberToDisplay: 0,
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEWCHATROOMREQUEST:
      return { ...state, loading: true };

    case IMPORTQUESTIONS:
      return { ...state, questions: shuffle(action.questions) };
    case NEWCHATROOMSUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.userId],
        err: null,
        roomUrl: action.roomUrl,
        roomId: action.roomId,
        questions: shuffle(state.questions),
        activeRoom: true,
        waiting: true,
      };

    case NEWCHATROOMFAILURE:
      return { ...state, loading: false, err: action.err };

    case JOINCHATROOMREQUEST:
      return { ...state, joinChatLoading: true };

    // case JOINCHATROOMSUCCESS:
    //   return {
    //     ...state,
    //     joinChatLoading: false,
    //     users: [...state.users, action.userId],
    //     waiting: false,
    //     questions: shuffle(action.questions),
    //   };
    case USERJOINED:
      const { user1, user2 } = action.users;
      return {
        ...state,
        user1,
        user2,
        waiting: user2.active ? false : true,
      };
    case DEACTIVATEROOM:
      return { ...state, user1: action.data.user1, user2: action.data.user2 };

    case JOINCHATROOMFAILURE:
      return { ...state, leaveChatLoading: false, err: action.err };

    case REFRESHCHATROOMSTATE:
      return {
        ...state,
        users: action.active ? action.users : state.users,
        activeUsers: action.users,
        roomUrl: action.roomUrl,
        roomId: action.roomId,
        activeRoom: action.active,
      };

    case DISPLAYPREVIOUSNEXTQUESTION:
      return {
        ...state,
        questionNumberToDisplay: action.questionNumberToDisplay,
      };

    default:
      return state;
  }
}
export default reducer;
