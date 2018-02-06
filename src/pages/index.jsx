import React from 'react';
import PropTypes from 'prop-types';

import { Head, IndexPage } from '../components';
import { allMarkdownRemark as allMarkdownRemarkPropType } from '../proptypes';

export default function BlogIndex({
  data: { site, allMarkdownRemark: { edges: posts } },
}) {
  return (
    <div>
      <Head site={site} />
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
    allMarkdownRemark: allMarkdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteUrl
        title
        author
        description
        facebookAppId
        twitterUser
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/pages/blog//" } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMM YYYY")
            excerpt
            title
          }
        }
      }
    }
  }
`;
