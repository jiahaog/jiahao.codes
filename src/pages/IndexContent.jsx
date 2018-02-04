import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Bio from '../components/Bio';

export default function IndexContent({ posts }) {
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
