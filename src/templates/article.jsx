import { Heading, Icon, Text, Flex, HStack } from '@chakra-ui/core'
import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'
import { Calendar, Watch } from 'emotion-icons/feather'
import MdxComponents from '../components/MdxComponents'

export default ({ data }) => {
  const { primary } = useColors()

  const article = {
    title: data.mdx.frontmatter.title,
    date: data.mdx.frontmatter.date,
    readingTime: data.mdx.fields.readingTime.text,
    body: data.mdx.body
  }

  return (
    <Layout>
      <SEO title={article.title} />
      <Heading
        as='h1'
        fontSize='4xl'
        textAlign='center'
        fontFamily='Montserrat'
        fontWeight='600'
        mt={7}
        mb={3}
      >
        {article.title}
      </Heading>
      <Flex
        margin='auto'
        width={{ base: 'auto', lg: '80%' }}
        pt={2}
        mb={6}
        borderTopWidth='2px'
        borderTopColor={primary}
        justify='space-between'
      >
        <HStack>
          <Icon as={Calendar} boxSize={6} />
          <Text fontSize='lg'>{article.date}</Text>
        </HStack>
        <HStack>
          <Icon as={Watch} boxSize={6} />
          <Text fontSize='lg'>{article.readingTime}</Text>
        </HStack>
      </Flex>

      <MDXProvider components={MdxComponents}>
        <MDXRenderer>{article.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query article($id: String) {
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
