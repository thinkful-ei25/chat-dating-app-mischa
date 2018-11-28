import React from 'react';
import {shallow} from 'enzyme';

import Chat from './chat-date';

describe('<Chat />', () => {
  it('Renders without crashing', ()=> {
    shallow(<Chat />);
  })
})
