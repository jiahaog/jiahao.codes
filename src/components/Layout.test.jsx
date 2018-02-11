import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

test('Link changes the class when hovered', () => {
  const wrapper = shallow(
    <Layout path="/something">{() => <span>Some content</span>}</Layout>,
  );
  expect(wrapper).toMatchSnapshot();
});
