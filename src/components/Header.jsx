import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function Header({ path }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link className={path === '/' ? 'active' : ''} to="/">
              &lt;Jia Hao /&gt;
            </Link>
          </li>
          <li>
            <Link className={path === '/about' ? 'active' : ''} to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};
