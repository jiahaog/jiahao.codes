import React from 'react';
import PropTypes from 'prop-types';

import { Head, Post } from '../components';
import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';

export default function PostTemplate({
  data: {
    site,
    markdownRemark: {
      excerpt,
      frontmatter: { title, date, excerpt: frontmatterExcerpt, path, cover },
      html,
    },
  },
}) {
  const imageSizes = cover && cover.childImageSharp.sizes;
  return (
    <div>
      <Head
        title={title}
        excerpt={frontmatterExcerpt || excerpt}
        path={path}
        site={site}
      />
      <Post
        title={title}
        date={date}
        html={html}
        coverImageSizes={imageSizes}
      />
    </div>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: markdownRemarkPropType,
    site: sitePropType.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
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
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      excerpt
      frontmatter {
        path
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        cover {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
