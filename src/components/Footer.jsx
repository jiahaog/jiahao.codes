import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

import { GitHub } from './svgs';

const FooterStyled = styled.footer`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
`;

const StyledLink = styled.a`
  background-image: none;

  &:hover {
    background-image: none;
  }
`;

const Copyright = styled.span`
  font-size: 0.8rem;
`;

export default function Footer() {
  return (
    <FooterStyled>
      <Copyright>© Jia Hao Goh</Copyright>
      <StyledLink
        href="https://github.com/jiahaog/jiahao.codes"
        target="_blank"
        rel="noopener"
      >
        <GitHub width="20px" />
      </StyledLink>
    </FooterStyled>
  );
}
