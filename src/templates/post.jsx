import {
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { FiCalendar, FiWatch } from 'react-icons/fi'

import Layout from '../components/Layout'
import MdxComponents from '../components/MdxComponents'
import Seo from '../components/Seo'

const PostTemplate = ({ data }) => {
  const post = {
    title: data.mdx.frontmatter.title,
    date: data.mdx.frontmatter.date,
    readingTime: data.mdx.fields.readingTime.text,
    slug: data.mdx.fields.slug,
    body: data.mdx.body,
    excerpt: data.mdx.excerpt,
  }

  return (
    <Layout>
      <Seo 
        title={post.title}
        description={post.excerpt}
        type='article'
        url={`https://praz.dev${post.slug}`}
      />
      <Heading
        as='h1'
        fontSize='4xl'
        textAlign='center'
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
        borderTopColor={useColorModeValue('brand.light', 'brand.dark')}
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
      excerpt
      fields {
        readingTime {
          text
        }
        slug
      }
      frontmatter {
        title
        date(locale: "en-gb", formatString: "ll")
      }
    }
  }
`

export default PostTemplate
