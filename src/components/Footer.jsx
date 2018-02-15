import React from 'react';
import styled from 'styled-components';

import { GitHub, RSS } from './icons';

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
  flex-grow: 1;
`;

export default function Footer() {
  return (
    <FooterStyled>
      <Copyright>
        <span role="img" aria-label="Copyright">
          &copy;
        </span>{' '}
        Jia Hao Goh
      </Copyright>
      <StyledLink
        href="/rss.xml"
        target="_blank"
        rel="noopener"
        title="RSS Feed"
      >
        <RSS width="16px" />
      </StyledLink>
      <StyledLink
        href="https://github.com/jiahaog/jiahao.codes"
        target="_blank"
        rel="noopener"
        title="Source code for this website"
      >
        <GitHub width="20px" />
      </StyledLink>
    </FooterStyled>
  );
}
