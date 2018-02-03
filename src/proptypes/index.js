import { PropTypes } from 'react';

const { shape: ptShape, string: ptString, arrayOf: ptArrayOf } = PropTypes;

export const site = ptShape({
  siteMetadata: ptShape({
    title: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;

export const markdownRemark = ptShape({
  path: ptString,
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

export const data = ptShape({
  site,
  allMarkdownRemark,
}).isRequired;
