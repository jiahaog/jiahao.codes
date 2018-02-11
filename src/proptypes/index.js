import PropTypes from 'prop-types';

const {
  shape: ptShape,
  string: ptString,
  number: ptNumber,
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

export const image = ptShape({
  // eslint-disable-next-line react/forbid-prop-types
  sizes: ptString.isRequired,
  // TODO: more fields here
});

export const markdownRemark = ptShape({
  frontmatter: ptShape({
    excerpt: ptString,
    title: ptString.isRequired,
    date: ptString.isRequired,
    path: ptString.isRequired,
    cover: ptShape({
      childImageSharp: ptShape({
        sizes: image.isRequired,
      }).isRequired,
    }),
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
