import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  margin-top: 10px;
  border-bottom: 1px solid #d6d6d6;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
`;

const SiteTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

const SiteLink = SiteTitle.extend`
  opacity: 0.7;
`;

export default function Header({ path }) {
  return (
    <HeaderStyled>
      <nav>
        <List>
          <li>
            <Link className={path === '/' ? 'active' : ''} to="/">
              <SiteTitle>&lt;Jia Hao /&gt;</SiteTitle>
            </Link>
          </li>
          <li>
            <Link className={path === '/about' ? 'active' : ''} to="/about">
              <SiteLink>About</SiteLink>
            </Link>
          </li>
        </List>
      </nav>
    </HeaderStyled>
  );
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};
