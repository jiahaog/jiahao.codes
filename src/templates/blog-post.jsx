import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';
import Bio from '../components/Bio';

export default function BlogPostTemplate({
  data: {
    site: { siteMetadata: { title: siteTitle } },
    markdownRemark: { frontmatter: { title, date }, html },
  },
}) {
  return (
    <div>
      <Helmet title={`${title} | ${siteTitle}`} />
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <Bio />
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
