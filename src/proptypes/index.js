import PropTypes from 'prop-types';

const {
  shape: ptShape,
  string: ptString,
  number: ptNumber,
  object: ptObject,
  arrayOf: ptArrayOf,
} = PropTypes;

export const siteSocial = ptShape({
  githubUrl: ptString.isRequired,
  keybaseUrl: ptString.isRequired,
  linkedInUrl: ptString.isRequired,
  twitterUrl: ptString.isRequired,
});

export const site = ptShape({
  siteMetadata: ptShape({
    siteUrl: ptString.isRequired,
    title: ptString.isRequired,
    author: ptString.isRequired,
    description: ptString.isRequired,
    facebookAppId: ptString.isRequired,
    twitterUser: ptString.isRequired,
    social: siteSocial.isRequired,
  }).isRequired,
});

// eslint-disable-next-line react/forbid-prop-types
export const image = ptObject;

export const markdownRemark = ptShape({
  frontmatter: ptShape({
    excerpt: ptString,
    title: ptString.isRequired,
    date: ptString.isRequired,
    path: ptString.isRequired,
    cover: image,
  }).isRequired,
  excerpt: ptString.isRequired,
  timeToRead: ptNumber.isRequired,
  html: ptString.isRequired,
}).isRequired;

export const allMarkdownRemark = ptShape({
  edges: ptArrayOf(
    ptShape({
      node: markdownRemark,
    }).isRequired,
  ).isRequired,
}).isRequired;
