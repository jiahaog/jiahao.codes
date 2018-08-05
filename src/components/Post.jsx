/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Image from './Image';
import { image as imagePropType } from '../proptypes';

const Title = styled.h1`
  @media only screen and (min-width: 740px) {
    font-size: 3.3rem;
  }
`;

const Date = styled.p`
  text-align: right;
  opacity: 0.7;
`;

const Excerpt = styled.p`
  opacity: 0.7;
  font-size: 1.1rem;
  margin-bottom: 0;
`;

export default function Post({ title, date, excerpt, html, coverImageSizes }) {
  return (
    <div>
      <Title>{title}</Title>
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Date>
        <small>{date}</small>
      </Date>
      {coverImageSizes && <Image alt={title} sizes={coverImageSizes} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <p>
        <Link to="/about">I’m</Link> Jia Hao, and I write software in San
        Francisco. Follow me on{' '}
        <a href="https://twitter.com/jiahaog" rel="noopener noreferrer">
          Twitter
        </a>!
      </p>
    </div>
  );
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  coverImageSizes: imagePropType,
};

Post.defaultProps = {
  coverImageSizes: null,
};
