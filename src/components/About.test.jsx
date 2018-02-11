import React from 'react';
import { shallow } from 'enzyme';

import About from './About';

test('rendering', () => {
  const props = {
    title: 'title',
    html: '<div>hello</div>',
    social: {
      githubUrl: 'githubUrl',
      keybaseUrl: 'keybaseUrl',
      linkedInUrl: 'linkedInUrl',
      twitterUrl: 'twitterUrl',
    },
  };
  const wrapper = shallow(<About {...props} />);
  expect(wrapper).toMatchSnapshot();
});
