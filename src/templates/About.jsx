import React from 'react';
import PropTypes from 'prop-types';

import { Head, About } from '../components';
import { markdownRemark as markdownRemarkPropType } from '../proptypes';

export default function AboutTemplate({
  data: { markdownRemark: { frontmatter: { title, path }, html } },
}) {
  return (
    <div>
      <Head title={title} path={path} />
      <About title={title} html={html} />
    </div>
  );
}

AboutTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: markdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query AboutPage($path: String!) {
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
