/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { siteSocial } from '../proptypes';
import githubSvg from '../pages/about/github.svg';
import keySvg from '../pages/about/key.svg';
import twitterSvg from '../pages/about/twitter.svg';

const SocialLink = styled.a`
  display: inline-block;
  background-image: none;

  &:hover {
    background-image: none;
  }
`;

const Icon = styled.img`
  width: 50px;
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
      <div>
        <SocialLink href={githubUrl}>
          <Icon src={githubSvg} alt="GitHub" />
        </SocialLink>
        <SocialLink href={keybaseUrl}>
          <Icon src={keySvg} alt="Keybase" />
        </SocialLink>
        <SocialLink href={twitterUrl}>
          <Icon src={twitterSvg} alt="Twitter" />
        </SocialLink>
      </div>
    </div>
  );
}

About.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  social: siteSocial.isRequired,
};
