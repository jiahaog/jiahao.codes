import React from 'react';
import Link from 'gatsby-link';

export default function Template({ location, children }) {
  let header;
  if (location.pathname === '/') {
    header = (
      <h1>
        <Link to="/">Gatsby Starter Blog</Link>
      </h1>
    );
  } else {
    header = (
      <h3>
        <Link to="/">Gatsby Starter Blog</Link>
      </h3>
    );
  }
  return (
    <div>
      {header}
      {children()}
    </div>
  );
}

Template.propTypes = {
  children: React.PropTypes.func.isRequired,
  location: React.PropTypes.shapeOf({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};
