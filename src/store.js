import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import chatReducer from './reducers/chat';
import authReducer from './reducers/auth';
import chatroomReducer from './reducers/chat-room';
import dashboardReducer from './reducers/dashboard';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth'; 
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    form: formReducer,
    chat: chatReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    chatroom: chatroomReducer
  })
  , applyMiddleware(thunk));

  // Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
  if (authToken) {
      const token = authToken;
      store.dispatch(setAuthToken(token));
      store.dispatch(refreshAuthToken());
  }
export default store;

