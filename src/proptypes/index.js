import PropTypes from 'prop-types';

const { shape: ptShape, string: ptString, arrayOf: ptArrayOf } = PropTypes;

export const site = ptShape({
  siteMetadata: ptShape({
    siteUrl: ptString.isRequired,
    title: ptString.isRequired,
    author: ptString.isRequired,
    description: ptString.isRequired,
    facebookAppId: ptString.isRequired,
    twitterUser: ptString.isRequired,
  }).isRequired,
});

export const markdownRemark = ptShape({
  frontmatter: ptShape({
    excerpt: ptString,
    title: ptString.isRequired,
    date: ptString.isRequired,
    path: ptString.isRequired,
  }).isRequired,
}).isRequired;

export const allMarkdownRemark = ptShape({
  edges: ptArrayOf(
    ptShape({
      node: markdownRemark,
    }).isRequired,
  ).isRequired,
}).isRequired;
