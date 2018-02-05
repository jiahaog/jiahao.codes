import React from 'react';
import PropTypes from 'prop-types';

import { Head, Post } from '../components';
import { markdownRemark as markdownRemarkPropType } from '../proptypes';

export default function PostTemplate({
  data: {
    markdownRemark: {
      excerpt,
      frontmatter: { title, date, excerpt: frontmatterExcerpt, path },
      html,
    },
  },
}) {
  return (
    <div>
      <Head title={title} excerpt={frontmatterExcerpt || excerpt} path={path} />
      <Post title={title} date={date} html={html} />
    </div>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: markdownRemarkPropType,
  }).isRequired,
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
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
