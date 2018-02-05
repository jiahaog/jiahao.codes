import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

function HomeLink({ showLarge }) {
  const Heading = `h${showLarge ? '1' : '3'}`;

  return (
    <Heading>
      <Link to="/">&lt;Jia Hao /&gt;</Link>
    </Heading>
  );
}

HomeLink.propTypes = {
  showLarge: PropTypes.bool.isRequired,
};

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 600px;
`;

export default function Layout({ location, children }) {
  return (
    <ContentDiv>
      <HomeLink showLarge={location.pathname === '/'} />
      {children()}
    </ContentDiv>
  );
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
