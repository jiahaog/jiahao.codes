import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';
import Post from '../components/Post';

export default function PostTemplate({
  data: {
    site: { siteMetadata: { title: siteTitle } },
    markdownRemark: { frontmatter: { title, date }, html },
  },
}) {
  return (
    <div>
      <Helmet title={`${title} | ${siteTitle}`} />
      <Post title={title} date={date} html={html} />
    </div>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    site: sitePropType,
    markdownRemark: markdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
