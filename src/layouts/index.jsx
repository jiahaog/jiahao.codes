import React from 'react';
import PropTypes from 'prop-types';
import Raven from 'raven-js';

import { Layout } from '../components';

// eslint-disable-next-line import/first
import 'prismjs/themes/prism.css';
import '../styles/globals.css';

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://95a2b760d7da4745871cfc24130d725e@sentry.io/283796', {
    environment: 'production',
  }).install();
}

export default function LayoutTemplate({ location: { pathname }, children }) {
  return <Layout path={pathname}>{children}</Layout>;
}

LayoutTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};
