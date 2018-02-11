import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

test('rendering', () => {
  const wrapper = shallow(<Header path="/something" />);
  expect(wrapper).toMatchSnapshot();
});
