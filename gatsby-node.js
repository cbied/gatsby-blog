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
  return await graphql(`
  {
    allMarkdownRemark {
          nodes {
            fields {
            slug
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    console.log(result.data.allMarkdownRemark)
  // Create blog post pages.
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    console.log('HERE: LINE 30 ' + node.fields.slug)
        createPage({
          // Path for this page — required
          path: `${node.fields.slug}`,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            id: node.id
          },
      })
    })
  })
},

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if(node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    console.log('HERE: LINE 54 ' + slug)
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}
