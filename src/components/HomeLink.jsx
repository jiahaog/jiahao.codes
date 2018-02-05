import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function HomeLink({ isLarge }) {
  const Heading = `h${isLarge ? '1' : '3'}`;

  return (
    <Heading>
      <Link to="/">&lt;Jia Hao /&gt;</Link>
    </Heading>
  );
}

HomeLink.propTypes = {
  isLarge: PropTypes.bool.isRequired,
};
