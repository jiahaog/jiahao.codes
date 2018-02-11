import React from 'react';
import { shallow } from 'enzyme';

import PostTemplate from './Post';
import { sitePropType, markdownRemarkPropType } from '../../test/fixtures';

test('rendering', () => {
  const props = {
    data: {
      site: sitePropType,
      markdownRemark: markdownRemarkPropType,
    },
  };
  const wrapper = shallow(<PostTemplate {...props} />);
  expect(wrapper).toMatchSnapshot();
});
