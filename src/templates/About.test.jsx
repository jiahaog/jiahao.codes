import React from 'react';
import { shallow } from 'enzyme';

import AboutTemplate from './About';
import { sitePropType, markdownRemarkPropType } from '../../test/fixtures';

test('rendering', () => {
  const props = {
    data: {
      site: sitePropType,
      markdownRemark: markdownRemarkPropType,
    },
  };
  const wrapper = shallow(<AboutTemplate {...props} />);
  expect(wrapper).toMatchSnapshot();
});
