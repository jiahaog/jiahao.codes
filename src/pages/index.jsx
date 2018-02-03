import React, { PropTypes } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';
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
      <Bio />
      {posts.map((post) => {
        if (post.node.path === '/404/') {
          return '';
        }

        const { title, path, date, excerpt } = post.node.frontmatter;

        return (
          <div key={path}>
            <h3>
              <Link to={path}>{title}</Link>
            </h3>
            <small>{date}</small>
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          </div>
        );
      })}
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
            title
          }
        }
      }
    }
  }
`;
