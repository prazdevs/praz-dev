import { Heading, Icon, Text, Flex, HStack } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'
import { FiCalendar, FiWatch } from 'react-icons/fi'
import MdxComponents from '../components/MdxComponents'

export default ({ data }) => {
  const { primary } = useColors()

  const post = {
    title: data.mdx.frontmatter.title,
    date: data.mdx.frontmatter.date,
    readingTime: data.mdx.fields.readingTime.text,
    body: data.mdx.body
  }

  return (
    <Layout>
      <SEO title={post.title} />
      <Heading
        as='h1'
        fontSize='4xl'
        textAlign='center'
        fontFamily='Montserrat'
        fontWeight='600'
        mt={7}
        mb={3}
      >
        {post.title}
      </Heading>
      <Flex
        margin='auto'
        width={{ base: 'auto', lg: '80%' }}
        pt={2}
        mb={8}
        borderTopWidth='2px'
        borderTopColor={primary}
        justify='space-between'
      >
        <HStack>
          <Icon as={FiCalendar} boxSize={6} />
          <Text fontSize='lg'>{post.date}</Text>
        </HStack>
        <HStack>
          <Icon as={FiWatch} boxSize={6} />
          <Text fontSize='lg'>{post.readingTime}</Text>
        </HStack>
      </Flex>

      <MDXProvider components={MdxComponents}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query post($id: String) {
    mdx(id: { eq: $id }) {
      mdxAST
      body
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(locale: "en-gb", formatString: "ll")
      }
    }
  }
`
