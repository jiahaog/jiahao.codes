import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../components';

// eslint-disable-next-line import/first
import 'prismjs/themes/prism.css';
import '../styles/globals.css';

export default function LayoutTemplate({ location: { pathname }, children }) {
  return <Layout path={pathname}>{children}</Layout>;
}

LayoutTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};
