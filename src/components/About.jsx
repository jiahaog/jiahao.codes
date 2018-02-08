/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GitHub, Keybase, Twitter } from './svgs';
import { siteSocial } from '../proptypes';

const SocialLinks = styled.div`
  text-align: right;
`;

const SocialLink = styled.a`
  display: inline-block;
  background-image: none;

  &:hover {
    background-image: none;
  }
`;

export default function About({
  title,
  html,
  social: { githubUrl, twitterUrl, keybaseUrl },
}) {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <SocialLinks>
        <SocialLink href={githubUrl} target="_blank" rel="noopener noreferrer">
          <GitHub />
        </SocialLink>
        <SocialLink href={keybaseUrl} target="_blank" rel="noopener noreferrer">
          <Keybase />
        </SocialLink>
        <SocialLink href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </SocialLink>
      </SocialLinks>
    </div>
  );
}

About.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  social: siteSocial.isRequired,
};
