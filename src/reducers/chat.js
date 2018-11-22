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

function addUsernameToMessage(messageData){
  const messages = messageData.messages.map((message) => {
        const userIdofMessage = message.user
          messageData.users.forEach((user) => {
            if (user._id === userIdofMessage) {
              message.userName = user.username;
            }
        })
        return message;
  });
  return messages;
}

function reducer(state=initialState, action) {
  switch(action.type){
    case FETCHMESSAGES:
      return  {...state, loading: true}

    case FETCHMESSAGESSSUCCESS:
    console.log('message data: ', action);
      return  {...state, loading: false, chatWindow: addUsernameToMessage(action.messageData), err: null}
    
    case FETCHMESSAGESERROR: 
      return {...state, loading: false, err: action.err}
    default: 
      return state;
  }
};
export default reducer;