import React from 'react';
import Jest, {shallow, mount} from 'enzyme';

import {Dashboard} from './dashboard';

describe.skip('<Dashboard />', () => {
  it('Renders without crashing', ()=> {
    shallow(<Dashboard loggedIn={true}/>);
  })
  it('Should return 3 components', () => {
    const wrapper = shallow(<Dashboard loggedIn={true}/>);
    console.log(wrapper.debug());
    expect(wrapper.find('Fragment').children()).to.have.lengthOf(3);
    
  })
  // it('Should redirect if props !== loggedIn', () => {
  //   const wrapper = shallow(<Dashboard />);
  //   wrapper.setState({
  //     loggedIn : false
  //   })
  // })
  
  // <JoinRandomRoom />
  // <h2>Do you want to start a chat?</h2>
  // <NewChatRoom />
  // <Logout /> 
});
