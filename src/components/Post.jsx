/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';

const Title = styled.h1`
  @media (min-width: 740px) {
    font-size: 3.3rem;
  }
`;

const Date = styled.p`
  text-align: right;
`;

const Excerpt = styled.p`
  opacity: 0.7;
  font-size: 1.1rem;
  margin-bottom: 0;
`;

const Img = styled(GatsbyImage)`
  --width: calc(100vw - 20rem);
  left: calc((-1 * var(--width) + 740px) / 2);
  width: var(--width);
  @media (max-width: 740px) {
    left: 0;
    width: initial;
    margin-left: -1rem;
    margin-right: -1rem;
  }
`;

const TestDiv = styled.div`
  float: left;
  height: 500px;
  background-color: blue;
`;

export default function Post({ title, date, excerpt, html, coverImageSizes }) {
  return (
    <div>
      <TestDiv />
      <Title>{title}</Title>
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Date>
        <small>{date}</small>
      </Date>
      {coverImageSizes && <Img alt={title} sizes={coverImageSizes} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <p>
        I’m Jia Hao, and I write software in Singapore. Find out more{' '}
        <Link to="/about">about me</Link>, or follow me on{' '}
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
  // eslint-disable-next-line react/forbid-prop-types
  coverImageSizes: PropTypes.object,
};

Post.defaultProps = {
  coverImageSizes: null,
};
