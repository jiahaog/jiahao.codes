import React from 'react';
import PropTypes from 'prop-types';

import Bio from './Bio';

export default function Post({ title, date, html }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <Bio />
    </div>
  );
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
