import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';

export default function BlogIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const posts = get(props, 'data.allMarkdownRemark.edges');

  return (
    <div>
      <Helmet title={get(props, 'data.site.siteMetadata.title')} />
      <Bio />
      {posts.map((post) => {
        if (post.node.path !== '/404/') {
          const title = get(post, 'node.frontmatter.title') || post.node.path;
          return (
            <div key={post.node.frontmatter.path}>
              <h3>
                <Link to={post.node.frontmatter.path}>
                  {post.node.frontmatter.title}
                </Link>
              </h3>
              <small>{post.node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          );
        }
      })}
    </div>
  );
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
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
