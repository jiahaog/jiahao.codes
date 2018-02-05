import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
  siteCoverImage,
  siteDescription,
  siteFacebookAppId,
  siteTitle,
  siteTwitterUser,
  siteUrl,
} from '../config';

const buildStructuredData = () =>
  JSON.stringify([
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: siteTitle,
      alternateName: siteTitle,
    },
    // TODO: more things for article https://developers.google.com/search/docs/data-types/article#non-amp
  ]);

function HeadComponent({
  description,
  image,
  structuredData,
  url,
  title,
  isPost,
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <script type="application/ld+json">{structuredData}</script>

      <meta property="og:url" content={url} />
      {isPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={siteFacebookAppId} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteTwitterUser} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

HeadComponent.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  structuredData: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isPost: PropTypes.bool.isRequired,
};

export default function Head({ image, path, excerpt, title }) {
  return (
    <HeadComponent
      {...{
        description: excerpt,
        image: siteUrl + image,
        url: siteUrl + path,
        title,
        isPost: !!path,
        structuredData: buildStructuredData(),
      }}
    />
  );
}

Head.propTypes = {
  excerpt: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
};

Head.defaultProps = {
  excerpt: siteDescription,
  image: siteCoverImage,
  title: siteTitle,
  path: '',
};
