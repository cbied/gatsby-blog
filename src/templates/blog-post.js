import * as React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../components/layout";


export default ({ data }) => {
    const post = data.markdownRemark;
    console.log( post );
    return(
        <Layout>
            <h2>Blog Post Page</h2>
            <div>
                <h3>{ post.frontmatter.title }</h3>
                <div dangerouslySetInnerHTML={{ __html: post.html }}/>
            </div>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
    
}

export const query = graphql`
    query($slug: String) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
    id
    fields {
      slug
    }
    html
    frontmatter {
      title
    }
  }
}
`