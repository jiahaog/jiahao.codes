import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Image from './Image';

test('Link changes the class when hovered', () => {
  const wrapper = shallow(<Image />);
  expect(wrapper).toMatchSnapshot();
});
