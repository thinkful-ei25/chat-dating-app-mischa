import React from 'react';
import {shallow, mount} from 'enzyme';

import {ChatArea} from './chatArea';
import { joinChatRoomRequest } from '../../actions/chat-room';

// jest.mock('./actions/chat', () => {

// })

describe.skip('<ChatArea />', () => {
  const messages = [{
    id: 0,
    message: "hi"
  }]
  const activeUsers = [{
    username: 'mischa'
  }]
  it('Renders without crashing', ()=> {
    const wrap = shallow(<ChatArea loggedIn={true} />);
    console.log(wrap.debug());
  })
  it('Displays messa', ()=> {
    const wrap = mount(<ChatArea messages={messages}
      activeUsers = {activeUsers}
      users = {activeUsers}
      loggedIn={true} />);
    console.log(wrap.debug());
  })
})
