import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

test('rendering', () => {
  const wrapper = shallow(<Footer path="/something" />);
  expect(wrapper).toMatchSnapshot();
});
