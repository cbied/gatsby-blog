/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`)
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`src/templates/blog-post.js`)
  return graphql(`
  query loadPagesQuery ($limit: Int!) {
    allMarkdownRemark(limit: $limit) {
        nodes {
          fields {
            slug
          }
      }
    }
  }
`, { limit: 1000 }).then(result => {
  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages.
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    console.log(node)
        createPage({
          // Path for this page — required
          path: `${node.fields.slug}`,
          component: blogPost,
          context: {
            // Add optional context data to be inserted
            // as props into the page component.
            //
            // The context data can also be used as
            // arguments to the page GraphQL query.
            //
            // The page "path" is always available as a GraphQL
            // argument.
          },
        })
    })
  })
},

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if(node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}
