import React from 'react';
import { shallow } from 'enzyme';
import IndexPage from './IndexPage';

import { imagePropType } from '../../test/fixtures';

test('rendering', () => {
  const wrapper = shallow(
    <IndexPage posts={[]} coverImageSizes={imagePropType} />,
  );
  expect(wrapper).toMatchSnapshot();
});
