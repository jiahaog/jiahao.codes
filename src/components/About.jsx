import React from 'react';
import PropTypes from 'prop-types';

export default function About({ title, html }) {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

About.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
