import {
  FETCHMESSAGES,
  FETCHMESSAGESSSUCCESS,
  FETCHMESSAGESERROR
} 
from '../actions/chat'
const initialState={
  chatWindow : [],
  loading: false,
  err: null
}

function reducer(state=initialState, action) {
  switch(action.type){
    case FETCHMESSAGES:
      return  {...state, loading: true}

    case FETCHMESSAGESSSUCCESS:
      return  {...state, loading: false, chatWindow: action.messagesList, err: null}
    
    case FETCHMESSAGESERROR: 
      return {...state, loading: false, err: action.err}
    default: 
      return state;
  }
};
export default reducer;