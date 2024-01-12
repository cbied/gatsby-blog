import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"


const blogPost = ( data ) => {
    console.log(data)
    return(
        <Layout>
            <h2>Blog Post Page</h2>
            <div>
                
            </div>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
    
}

export default blogPost;