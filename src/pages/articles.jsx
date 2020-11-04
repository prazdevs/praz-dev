import { Flex, Heading, Text } from '@chakra-ui/core'

import ArticleList from '../components/ArticleList'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'

const ArticlesPage = ({ data }) => {
  const { primary } = useColors()

  const articles = data.articles.nodes.map(node => ({
    ...node.frontmatter,
    link: node.slug,
    readingTime: node.fields.readingTime.text
  }))

  return (
    <Layout>
      <SEO title='Articles' />
      <Flex direction='column'>
        <Heading
          as='h1'
          fontFamily='Montserrat'
          fontWeight='normal'
          fontSize='4xl'
          mr='auto'
          mb={4}
          borderBottomColor={primary}
          borderBottomWidth='2px'
        >
          Articles
        </Heading>
        <Text mb={8} fontSize='lg'>
          You will find here posts about problems I encountered and solutions I
          found, as well as discoveries I made and thought were interesting to
          talk about.
        </Text>
        <ArticleList articles={articles} />
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query {
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/articles/" } }
    ) {
      nodes {
        fields {
          readingTime {
            text
          }
        }
        frontmatter {
          date(locale: "en-gb", formatString: "ll")
          title
          tags
        }
        slug
      }
    }
  }
`

export default ArticlesPage
