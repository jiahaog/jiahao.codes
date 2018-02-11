import React from 'react';
import { shallow } from 'enzyme';

import IndexTemplate from '.';

test('rendering', () => {
  const props = {
    location: { pathname: 'pathname' },
    children: () => 'children',
  };
  const wrapper = shallow(<IndexTemplate {...props} />);
  expect(wrapper).toMatchSnapshot();
});
