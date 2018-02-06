import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Header } from '../components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

const LayoutDiv = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 600px;
`;

export default function Layout({ location: { pathname }, children }) {
  return (
    <LayoutDiv>
      <Header path={pathname} />
      <ContentDiv>{children()}</ContentDiv>
    </LayoutDiv>
  );
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
