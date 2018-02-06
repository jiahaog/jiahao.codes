const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const createPages = (
  { graphql, boundActionCreators: { createPage } },
  filter,
  componentPath,
) =>
  new Promise((resolve, reject) => {
    const template = path.resolve(componentPath);
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "${filter}" } }
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
          reject(result.errors);
          return;
        }

        result.data.allMarkdownRemark.edges.forEach(
          ({ node: { frontmatter: { path: pagePath } } }) => {
            createPage({
              path: pagePath,
              component: template,
              context: {
                path: pagePath,
              },
            });
          },
        );
      }),
    );
  });

exports.createPages = async (props) => {
  await createPages(props, '/src/pages/blog/', './src/templates/Post.jsx');
  await createPages(props, '/src/pages/about/', './src/templates/About.jsx');
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
