import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Image from './Image';

test('When no props are passed in', () => {
  const wrapper = shallow(<Image />);
  expect(wrapper).toMatchSnapshot();
});

test('When a width is passed in', () => {
  const wrapper = shallow(<Image width="20vw" />);
  expect(wrapper).toMatchSnapshot();
});
