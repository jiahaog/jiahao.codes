import React from 'react';
import PropTypes from 'prop-types';

import { Head, About } from '../components';
import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';

export default function AboutTemplate({
  data: {
    site,
    markdownRemark: {
      frontmatter: {
        title,
        path,
        cover: { childImageSharp: { sizes: coverImageSizes } },
      },
      html,
    },
  },
}) {
  return (
    <div>
      <Head title={title} path={path} site={site} />
      <About
        title={title}
        html={html}
        social={site.siteMetadata.social}
        coverImageSizes={coverImageSizes}
      />
    </div>
  );
}

AboutTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: markdownRemarkPropType,
    site: sitePropType.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query AboutPage($path: String!) {
    ...SiteFragment
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...MarkdownMetadataFragment
      ...MarkdownFrontmatterWithCoverFragment
    }
  }
`;
