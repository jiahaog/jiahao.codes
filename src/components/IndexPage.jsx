/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

const PostLink = styled(Link)`
  display: inline-block;
  width: 100%;
  background-image: none;
  border-bottom: 1px solid #eee;
  padding-left: 1rem;
  padding-right: 1rem;

  &:hover {
    background-color: #f8f8f7;
    background-image: none;
  }

  @media (max-width: 740px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const PostContent = styled.div`
  color: hsla(0, 0%, 0%, 0.8);
  opacity: 0.8;
`;

const PostTitle = styled.h3`
  margin-top: 1rem;
`;

const PostDate = styled.small`
  display: block;
  margin-bottom: 0.5rem;
`;

const PostExcerpt = styled.p`
  @media (max-width: 740px) {
    margin-bottom: 0;
  }
`;

const MobileAnchor = styled.p`
  text-align: right;
  text-transform: uppercase;

  @media (min-width: 740px) {
    display: none;
  }
`;

export default function IndexPage({ posts }) {
  return (
    <div>
      <div>
        {posts.map(({ title, path, date, excerpt }) => (
          <PostLink key={path} to={path}>
            <PostTitle>{title}</PostTitle>
            <PostContent>
              <PostDate>{date}</PostDate>
              <PostExcerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
            </PostContent>

            <MobileAnchor>
              <small>Read More</small>
            </MobileAnchor>
          </PostLink>
        ))}
      </div>
    </div>
  );
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
