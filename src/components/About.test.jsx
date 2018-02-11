import React from 'react';
import { shallow } from 'enzyme';

import About from './About';

test('rendering', () => {
  const props = {
    title: 'title',
    html: '<div>hello</div>',
    social: {
      githubUrl: 'github',
      keybaseUrl: 'keybase',
      linkedInUrl: 'linkedin',
      twitterUrl: 'twitter',
    },
  };
  const wrapper = shallow(<About {...props} />);
  expect(wrapper).toMatchSnapshot();
});
