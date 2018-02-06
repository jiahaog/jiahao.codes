import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function Header({ isLarge }) {
  const Heading = `h${isLarge ? '1' : '3'}`;

  return (
    <header>
      <Heading>
        <Link to="/">&lt;Jia Hao /&gt;</Link>
      </Heading>
    </header>
  );
}

Header.propTypes = {
  isLarge: PropTypes.bool.isRequired,
};
