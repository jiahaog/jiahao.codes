import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

test('rendering', () => {
  const props = {
    title: 'title',
    date: 'date',
    excerpt: 'excerpt',
    html: '<div>some html</div>',
    coverImageSizes: {},
  };
  const wrapper = shallow(<Post {...props} />);
  expect(wrapper).toMatchSnapshot();
});
