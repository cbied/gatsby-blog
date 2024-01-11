import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"



export default ({ data }) => {
  console.log(data.allMarkdownRemark)
  return (
  <Layout>
    <div>
      <h1>Bied's Thoughts</h1>
      <h4>{ data.allMarkdownRemark.totalCount }</h4>
      <div>
        { data.allMarkdownRemark.nodes.map(blogs => {
          console.log(blogs)
          return (
            <div>
            <h3>{ blogs.frontmatter.title } - { blogs.frontmatter.date }</h3>
            <h4 key={blogs.id}>{ blogs.excerpt }</h4>
            </div>
          )
        }) }
      </div>
    </div>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
      allMarkdownRemark {
      totalCount,
      nodes {
        id
        frontmatter {
          date
          description
          title
        }
        excerpt
      }
    }
  }
`