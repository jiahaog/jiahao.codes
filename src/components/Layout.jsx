import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';

const LayoutDiv = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ContentDiv = styled.div`
  margin: 3rem auto;
  max-width: 600px;
`;

export default function Layout({ path, children }) {
  return (
    <LayoutDiv>
      <Header path={path} />
      <ContentDiv>{children()}</ContentDiv>
    </LayoutDiv>
  );
}

Layout.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
