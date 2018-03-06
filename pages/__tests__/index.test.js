/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

// Channels
const channels = require('./data/channels.test.json').channels;

import { Index } from '../index.js';

describe('Index', () => {
  it('Basic rendering', () => {
    const app = shallow(<Index channels={ channels } filter={ 'All' } volume={ 50 }/>);
  });

  it('Basic rendering (snapshot)', () => {
    const component = renderer.create(<Index channels={ channels } filter={ 'All' } volume={ 50 }/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

