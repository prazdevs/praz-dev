import { Heading } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

export default ({ data }) => {
  const article = {
    title: data.mdx.frontmatter.title,
    body: data.mdx.body
  }

  return (
    <Layout>
      <SEO title={article.title} />
      <Heading as='h1'>{article.title}</Heading>
      <MDXProvider>
        <MDXRenderer>{article.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query article($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`
