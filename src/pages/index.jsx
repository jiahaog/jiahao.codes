import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { IndexPage } from '../components';
import {
  allMarkdownRemark as allMarkdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';

export default function BlogIndex({
  data: {
    site: { siteMetadata: { title: siteTitle } },
    allMarkdownRemark: { edges: posts },
  },
}) {
  return (
    <div>
      <Helmet title={siteTitle} />
      <IndexPage
        posts={posts.map(
          ({
            node: {
              excerpt,
              frontmatter: { excerpt: frontmatterExcerpt, title, path, date },
            },
          }) => ({
            title,
            path,
            date,
            excerpt: frontmatterExcerpt || excerpt,
          }),
        )}
      />
    </div>
  );
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: sitePropType,
    allMarkdownRemark: allMarkdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMM YYYY")
          }
          frontmatter {
            excerpt
            title
          }
        }
      }
    }
  }
`;
