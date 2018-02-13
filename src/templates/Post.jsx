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
  const imageSrc = imageSizes && imageSizes.src;
  return (
    <div>
      <Head
        title={title}
        excerpt={frontmatterExcerpt || excerpt}
        path={path}
        site={site}
        image={imageSrc}
      />
      <Post
        title={title}
        date={date}
        html={html}
        excerpt={frontmatterExcerpt}
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
    ...SiteFragment
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...MarkdownMetadataFragment
      ...MarkdownFrontmatterWithCoverFragment
    }
  }
`;
