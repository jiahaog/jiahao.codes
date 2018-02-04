const path = require('path');

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) =>
  new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/index.jsx');
    resolve(
      graphql(`
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
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

        result.data.allMarkdownRemark.edges.forEach((edge) => {
          createPage({
            path: edge.node.frontmatter.path,
            component: blogPost,
            context: {
              path: edge.node.frontmatter.path,
            },
          });
        });
      }),
    );
  });
