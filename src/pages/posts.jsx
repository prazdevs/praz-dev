import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Seo from '../components/Seo'

const PostsPage = ({ data }) => {
  const posts = data.posts.nodes.map(node => ({
    ...node.frontmatter,
    excerpt: node.excerpt,
    link: node.fields.slug,
    readingTime: node.fields.readingTime.text
  }))

  const { header, subheader } = data.page.frontmatter

  return (
    <Layout>
      <Seo 
        title='Posts'
        description={subheader}
        url='https://praz.dev/posts'
      />
      <Flex direction='column'>
        <Heading
          as='h1'
          fontWeight='700'
          mr='auto'
          mt={{ base: 4, sm: 7 }}
          mb={4}
          borderBottomColor={useColorModeValue('brand.light', 'brand.dark')}
          borderBottomWidth='2px'
        >
          {header}
        </Heading>
        <Text mb={8} fontSize='lg' fontWeight='500'>
          {subheader}
        </Text>
        <PostList posts={posts} />
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
    ) {
      nodes {
        excerpt
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(locale: "en-gb", formatString: "ll")
          title
          tags
        }
      }
    }
    page: mdx(fileAbsolutePath: { regex: "/content/pages/posts/" }) {
      frontmatter {
        header
        subheader
      }
    }
  }
`

export default PostsPage
