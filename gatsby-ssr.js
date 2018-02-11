/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-danger */

// Modified from https://github.com/octalmage/gatsby-plugin-sentry/blob/ef246461a5f5e8b4f9d4004fe146f4904864dd2b/src/gatsby-ssr.js

import React from 'react';
import PropTypes from 'prop-types';

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

exports.onRenderBody = ({ setHeadComponents }, { version, dsn }) =>
  setHeadComponents([
    <SentryCdn version={version} key="gatsby-plugin-sentry-cdn" />,
    <SentryInstall dsn={dsn} key="gatsby-plugin-sentry-install" />,
  ]);
