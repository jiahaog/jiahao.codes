import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layout } from '../components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

export default function LayoutTemplate({ location: { pathname }, children }) {
  return <Layout path={pathname} children={children} />;
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
