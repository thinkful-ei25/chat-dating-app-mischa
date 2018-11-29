import React from 'react';
import {shallow} from 'enzyme';

import ChatArea from './chat-date';

describe('<ChatArea />', () => {
  it('Renders without crashing', ()=> {
    shallow(<ChatArea />);
  })
})
