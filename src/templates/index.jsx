import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';
import BlogPost from './BlogPost';

export default function BlogPostTemplate({
  data: {
    site: { siteMetadata: { title: siteTitle } },
    markdownRemark: { frontmatter: { title, date }, html },
  },
}) {
  return (
    <div>
      <Helmet title={`${title} | ${siteTitle}`} />
      <BlogPost title={title} date={date} html={html} />
    </div>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: sitePropType,
    markdownRemark: markdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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
