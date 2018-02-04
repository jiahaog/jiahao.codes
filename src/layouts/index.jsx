import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

require('prismjs/themes/prism.css');
require('../styles/styles.css');

export default function Template({ location, children }) {
  let header;
  if (location.pathname === '/') {
    header = (
      <h1>
        <Link to="/">Jia Hao</Link>
      </h1>
    );
  } else {
    header = (
      <h3>
        <Link to="/">Jia Hao</Link>
      </h3>
    );
  }
  return (
    <div style={{ margin: '3rem auto', maxWidth: 600 }}>
      {header}
      {children()}
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
