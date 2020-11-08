import { Flex, Heading, Text } from '@chakra-ui/core'

import PostList from '../components/PostList'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'
import { graphql } from 'gatsby'

const PostsPage = ({ data }) => {
  const { primary } = useColors()

  const posts = data.posts.nodes.map(node => ({
    ...node.frontmatter,
    excerpt: node.excerpt,
    link: node.fields.slug,
    readingTime: node.fields.readingTime.text
  }))

  return (
    <Layout>
      <SEO title='Posts' />
      <Flex direction='column'>
        <Heading
          as='h1'
          fontFamily='Montserrat'
          fontWeight='700'
          mr='auto'
          mt={7}
          mb={4}
          borderBottomColor={primary}
          borderBottomWidth='2px'
        >
          Posts
        </Heading>
        <Text mb={8} fontSize='lg' fontWeight='500'>
          You will find here posts about problems I encountered and solutions I
          found, as well as discoveries I made and thought were interesting to
          talk about.
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
  }
`

export default PostsPage
