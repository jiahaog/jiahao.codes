export const imagePropType = {
  sizes: 'something',
};

export const markdownRemarkPropType = {
  frontmatter: {
    excerpt: 'excerpt',
    title: 'title',
    date: 'date',
    path: 'path',
    cover: {
      childImageSharp: {
        sizes: imagePropType,
      },
    },
  },
  excerpt: 'excerpt',
  timeToRead: 10,
  html: '<div>some content</div>',
};

export const sitePropType = {
  siteMetadata: {
    siteUrl: 'siteUrl',
    title: 'title',
    author: 'author',
    description: 'description',
    facebookAppId: 'facebookAppId',
    twitterUser: 'twitterUser',
    social: {
      githubUrl: 'githubUrl',
      keybaseUrl: 'keybaseUrl',
      linkedInUrl: 'linkedInUrl',
      twitterUrl: 'twitterUrl',
    },
  },
};
