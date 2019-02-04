import {
  FETCHMESSAGES,
  FETCHMESSAGESSSUCCESS,
  FETCHMESSAGESERROR,
  NEWMESSAGE,
} from '../actions/chat';
import { addUsernameToMessage } from '../utils';
const initialState = {
  chatWindow: [],
  loading: false,
  err: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHMESSAGES:
      return { ...state, loading: true };

    case FETCHMESSAGESSSUCCESS:
      return {
        ...state,
        loading: false,
        chatWindow: addUsernameToMessage(
          action.messageData,
          action.usersInRoom
        ),
        err: null,
      };

    case FETCHMESSAGESERROR:
      return { ...state, loading: false, err: action.err };

    case NEWMESSAGE:
      return { ...state, chatWindow: [...state.chatWindow, action.message] };
    default:
      return state;
  }
}
export default reducer;
