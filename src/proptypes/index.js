import PropTypes from 'prop-types';

const {
  shape: ptShape,
  string: ptString,
  object: ptObject,
  arrayOf: ptArrayOf,
} = PropTypes;

export const siteSocial = ptShape({
  githubUrl: ptString.isRequired,
  twitterUrl: ptString.isRequired,
  keybaseUrl: ptString.isRequired,
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

export const markdownRemark = ptShape({
  frontmatter: ptShape({
    excerpt: ptString,
    title: ptString.isRequired,
    date: ptString.isRequired,
    path: ptString.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    cover: ptObject,
  }).isRequired,
}).isRequired;

export const allMarkdownRemark = ptShape({
  edges: ptArrayOf(
    ptShape({
      node: markdownRemark,
    }).isRequired,
  ).isRequired,
}).isRequired;
