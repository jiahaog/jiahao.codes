import React from 'react';
import PropTypes from 'prop-types';

import { Head, IndexPage } from '../components';
import {
  allMarkdownRemark as allMarkdownRemarkPropType,
  image as imagePropType,
} from '../proptypes';

export default function SiteIndex({
  data: { site, allMarkdownRemark: { edges: posts }, indexCover },
}) {
  return (
    <div>
      <Head site={site} />
      <IndexPage
        posts={posts.map(
          ({
            node: {
              excerpt,
              timeToRead,
              frontmatter: { excerpt: frontmatterExcerpt, title, path, date },
            },
          }) => ({
            title,
            path,
            date,
            timeToRead,
            excerpt: frontmatterExcerpt || excerpt,
          }),
        )}
        coverImageSizes={indexCover.sizes}
      />
    </div>
  );
}

SiteIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: allMarkdownRemarkPropType,
    indexCover: PropTypes.shape({
      sizes: imagePropType,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    ...SiteFragment
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/pages/blog//" } }
    ) {
      edges {
        node {
          ...MarkdownMetadataFragment
          ...MarkdownFrontmatterFragment
        }
      }
    }
    indexCover: imageSharp(id: { regex: "/indexCover/" }) {
      sizes(maxWidth: 2560) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
