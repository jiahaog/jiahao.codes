import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

require('prismjs/themes/prism.css');
require('../styles/styles.css');

function HomeLink({ showLarge }) {
  const Heading = `h${showLarge ? '1' : '3'}`;

  return (
    <Heading>
      <Link to="/">&lt;Jia Hao /&gt;</Link>
    </Heading>
  );
}

HomeLink.propTypes = {
  showLarge: PropTypes.bool.isRequired,
};

export default function Template({ location, children }) {
  return (
    <div style={{ margin: '3rem auto', maxWidth: 600 }}>
      <HomeLink showLarge={location.pathname === '/'} />
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
