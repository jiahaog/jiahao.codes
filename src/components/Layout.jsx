import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const LayoutDiv = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 740px;
`;

export default function Layout({ path, children }) {
  return (
    <LayoutDiv>
      <Header path={path} />
      <ContentDiv>{children()}</ContentDiv>
      <Footer />
    </LayoutDiv>
  );
}

Layout.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
