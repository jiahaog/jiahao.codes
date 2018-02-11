import React from 'react';
import { shallow } from 'enzyme';

import SiteIndex from '.';
import { sitePropType, imagePropType } from '../../test/fixtures';

test('rendering', () => {
  const props = {
    data: {
      site: sitePropType,
      allMarkdownRemark: {
        edges: [],
      },
      indexCover: {
        sizes: imagePropType,
      },
    },
  };
  const wrapper = shallow(<SiteIndex {...props} />);
  expect(wrapper).toMatchSnapshot();
});
