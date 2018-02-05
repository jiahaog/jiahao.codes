import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HomeLink } from '../components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 600px;
`;

export default function Layout({ location, children }) {
  return (
    <ContentDiv>
      <HomeLink isLarge={location.pathname === '/'} />
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
