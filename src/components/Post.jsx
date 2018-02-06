/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

export default function Post({ title, date, html, coverImageSizes }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        <small>{date}</small>
      </p>
      {coverImageSizes && (
        <Img alt={title} sizes={coverImageSizes} backgroundColor />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <p>
        I’m Jia Hao, and I write software in Singapore. Find out more{' '}
        <Link to="/about">about me</Link>, or follow me on{' '}
        <a href="https://twitter.com/jiahaog" rel="noopener noreferrer">
          Twitter
        </a>!
      </p>
    </div>
  );
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  coverImageSizes: PropTypes.object,
};

Post.defaultProps = {
  coverImageSizes: null,
};
