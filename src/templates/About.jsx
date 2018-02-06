import React from 'react';
import PropTypes from 'prop-types';

import { Head, About } from '../components';
import {
  markdownRemark as markdownRemarkPropType,
  site as sitePropType,
} from '../proptypes';

export default function AboutTemplate({
  data: { site, markdownRemark: { frontmatter: { title, path }, html } },
}) {
  return (
    <div>
      <Head title={title} path={path} site={site} />
      <About title={title} html={html} social={site.siteMetadata.social} />
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
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      excerpt
      frontmatter {
        path
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
