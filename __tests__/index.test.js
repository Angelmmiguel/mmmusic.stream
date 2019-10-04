/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';

// Channels
const channels = require('./data/channels.test.json').channels;

import { Index } from '../pages/index.js';

describe('Index', () => {
  it('Basic rendering', () => {
    const app = shallow(<Index channels={ channels } filter={ 'All' } volume={ 50 }/>);
  });
});

