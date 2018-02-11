import React from 'react';
import { shallow } from 'enzyme';
import Head from './Head';
import { sitePropType } from '../../test/fixtures';

test('rendering', () => {
  const props = {
    excerpt: 'excerpt',
    image: 'image',
    title: 'title',
    path: 'path',
    site: sitePropType,
  };
  const wrapper = shallow(<Head {...props} />);
  expect(wrapper).toMatchSnapshot();
});
