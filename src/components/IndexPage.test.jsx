import React from 'react';
import { shallow } from 'enzyme';
import IndexPage from './IndexPage';

test('rendering', () => {
  const wrapper = shallow(<IndexPage posts={[]} coverImageSizes={{}} />);
  expect(wrapper).toMatchSnapshot();
});
