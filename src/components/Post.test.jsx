import React from 'react';
import { shallow } from 'enzyme';

import Post from './Post';
import { imagePropType } from '../../test/fixtures';

test('rendering', () => {
  const props = {
    title: 'title',
    date: 'date',
    excerpt: 'excerpt',
    html: '<div>some html</div>',
    coverImageSizes: imagePropType,
  };
  const wrapper = shallow(<Post {...props} />);
  expect(wrapper).toMatchSnapshot();
});
