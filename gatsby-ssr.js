/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-danger */

// Modified from https://github.com/octalmage/gatsby-plugin-sentry/blob/ef246461a5f5e8b4f9d4004fe146f4904864dd2b/src/gatsby-ssr.js

import React from 'react';
import PropTypes from 'prop-types';

const SENTRY_DSN = 'https://95a2b760d7da4745871cfc24130d725e@sentry.io/283796';
const SENTRY_VERSION = '3.22.1';

function SentryCdn({ version }) {
  return (
    <script
      async
      src={`https://cdn.ravenjs.com/${version}/raven.min.js`}
      crossOrigin="anonymous"
    />
  );
}

SentryCdn.propTypes = {
  version: PropTypes.string,
};

SentryCdn.defaultProps = {
  version: '3.19.1',
};

function SentryInstall({ dsn }) {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `Raven.config('${dsn}', { environment: '${
          process.env.NODE_ENV
        }' }).install();`,
      }}
    />
  );
}

SentryInstall.propTypes = {
  dsn: PropTypes.string.isRequired,
};

exports.onRenderBody = ({ setHeadComponents }) =>
  setHeadComponents([
    <SentryCdn version={SENTRY_VERSION} key="gatsby-plugin-sentry-cdn" />,
    <SentryInstall dsn={SENTRY_DSN} key="gatsby-plugin-sentry-install" />,
  ]);
