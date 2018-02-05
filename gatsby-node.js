const path = require('path');

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) =>
  new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/index.jsx');
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/src/pages/blog//" } }
          ) {
            edges {
              node {
                fileAbsolutePath
                frontmatter {
                  path
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(
          ({ node: { fileAbsolutePath, frontmatter: { path } } }) => {
            createPage({
              path,
              component: blogPost,
              context: {
                path,
              },
            });
          },
        );
      }),
    );
  });
