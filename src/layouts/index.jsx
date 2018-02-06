import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '../components';

require('prismjs/themes/prism.css');
require('../styles/globals.css');

export default function LayoutTemplate({ location: { pathname }, children }) {
  return <Layout path={pathname}>{children}</Layout>;
}

LayoutTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};
