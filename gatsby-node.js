const path = require('path');

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
          // eslint-disable-next-line no-console
          console.error(result.errors);
          reject(result.errors);
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
