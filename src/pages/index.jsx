import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';

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

const {
  shape: ptShape,
  string: ptString,
  arrayOf: ptArrayOf,
} = React.PropTypes;

BlogIndex.propTypes = {
  data: ptShape({
    site: ptShape({
      siteMetadata: ptShape({
        title: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    allMarkdownRemark: ptShape({
      edges: ptArrayOf(
        ptShape({
          node: ptShape({
            path: ptString,
            frontmatter: ptShape({
              excerpt: ptString,
              title: ptString.isRequired,
              date: ptString.isRequired,
              path: ptString.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
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
