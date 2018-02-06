import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  margin-top: 10px;
  border-bottom: 1px solid #d6d6d6;
`;

const NavLink = styled(Link)`
  background-image: none;

  &:hover {
    background-image: none;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
`;

const SiteTitle = styled.h3`
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: ${(props) => (props.active ? '#26418f' : '')};
  cursor: ${(props) => (props.active ? 'default' : '')};

  &:hover {
    color: #26418f;
  }
`;

const SiteLink = SiteTitle.extend`
  opacity: 0.7;

  /* Always keep 5px + 2px of space for the block so that the bottom border does not
  shift when navigating */
  padding-bottom: ${(props) => (props.active ? '5px' : '7px')};
  border-bottom: ${(props) => (props.active ? '2px solid #26418f' : '')};
`;

export default function Header({ path }) {
  return (
    <HeaderStyled>
      <nav>
        <List>
          <li>
            <NavLink to="/">
              <SiteTitle active={path === '/'}>&lt;Jia Hao /&gt;</SiteTitle>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <SiteLink active={path === '/about'}>About</SiteLink>
            </NavLink>
          </li>
        </List>
      </nav>
    </HeaderStyled>
  );
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};
