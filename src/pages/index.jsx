import React from 'react';
import PropTypes from 'prop-types';

import { Head, IndexPage } from '../components';
import {
  allMarkdownRemark as allMarkdownRemarkPropType,
  image as imagePropType,
} from '../proptypes';

export default function BlogIndex({
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
        coverImage={indexCover}
      />
    </div>
  );
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: allMarkdownRemarkPropType,
    indexCover: imagePropType,
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
        social {
          githubUrl
          twitterUrl
          keybaseUrl
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/pages/blog//" } }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            path
            date(formatString: "DD MMM YYYY")
            excerpt
            title
          }
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
