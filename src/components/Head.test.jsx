import React from 'react';
import { shallow } from 'enzyme';
import Head from './Head';

test('rendering', () => {
  const props = {
    excerpt: 'excerpt',
    image: 'image',
    title: 'title',
    path: 'path',
    site: {
      siteMetadata: {
        siteUrl: 'siteUrl',
        title: 'title',
        author: 'author',
        description: 'description',
        facebookAppId: 'facebookAppId',
        twitterUser: 'twitterUser',
        social: {
          githubUrl: 'githubUrl',
          keybaseUrl: 'keybaseUrl',
          linkedInUrl: 'linkedInUrl',
          twitterUrl: 'twitterUrl',
        },
      },
    },
  };
  const wrapper = shallow(<Head {...props} />);
  expect(wrapper).toMatchSnapshot();
});
