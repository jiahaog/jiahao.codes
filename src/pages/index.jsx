import React from 'react';
import PropTypes from 'prop-types';

import { Head, IndexPage } from '../components';
import { allMarkdownRemark as allMarkdownRemarkPropType } from '../proptypes';

export default function BlogIndex({
  data: { allMarkdownRemark: { edges: posts } },
}) {
  return (
    <div>
      <Head />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
