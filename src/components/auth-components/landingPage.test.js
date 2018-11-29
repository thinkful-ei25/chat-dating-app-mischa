import React from 'react';
import {shallow, mount} from 'enzyme';

import {LandingPage} from './landingPage';

describe('<LandingPage />', () => {
  it('Renders without crashing', ()=> {
    shallow(<LandingPage />);
  })
  it('to redirect when user loggedIn', ()=> {
    const wrap = mount(<LandingPage loggedIn={true}/>);
    console.log(wrap.debug());
  })
})
