import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';
import {
  allMarkdownRemark as allMarkdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';

function IndexContent({ posts }) {
  return (
    <div>
      <Bio />
      {posts.map(({ title, path, date, excerpt }) => (
        <div key={path}>
          <h3>
            <Link to={path}>{title}</Link>
          </h3>
          <small>{date}</small>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      ))}
    </div>
  );
}

IndexContent.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function BlogIndex({
  data: {
    site: { siteMetadata: { title: siteTitle } },
    allMarkdownRemark: { edges: posts },
  },
}) {
  return (
    <div>
      <Helmet title={siteTitle} />
      <IndexContent
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
            date(formatString: "DD MMMM, YYYY")
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
