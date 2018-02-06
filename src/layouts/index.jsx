import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Header } from '../components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 600px;

  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default function Layout({ location, children }) {
  return (
    <div>
      <Header isLarge={location.pathname === '/'} />
      <ContentDiv>{children()}</ContentDiv>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
