import { Flex, Heading, Stack } from '@chakra-ui/core'
import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'
import ArticleList from '../components/ArticleList'
import ProjectList from '../components/ProjectList'

const SectionHeading = ({ heading }) => {
  const { primary } = useColors()
  return (
    <Heading
      as='h2'
      fontFamily='Montserrat'
      fontWeight='normal'
      fontSize='3xl'
      mr='auto'
      mb={4}
      borderBottomColor={primary}
      borderBottomWidth='2px'
    >
      {heading}
    </Heading>
  )
}

const IndexPage = ({ data }) => {
  const articles = data.articles.nodes.map(node => ({
    ...node.frontmatter,
    link: node.slug,
    readingTime: node.fields.readingTime.text
  }))
  const projects = data.projects.nodes.map(node => ({
    ...node.frontmatter
  }))

  const { primary } = useColors()

  return (
    <Layout>
      <SEO title='Home' />
      <Stack spacing={12}>
        <Flex direction='column'>
          <SectionHeading heading='Latest articles' />
          <ArticleList articles={articles} isCondensed />
        </Flex>
        <Flex direction='column'>
          <SectionHeading heading='Projects' />
          <ProjectList projects={projects} />
        </Flex>
      </Stack>
    </Layout>
  )
}

export const query = graphql`
  query {
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/articles/" } }
      limit: 5
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
        }
        slug
      }
    }
    projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
    ) {
      nodes {
        frontmatter {
          title
          link
          description
          maintained
        }
      }
    }
  }
`

export default IndexPage
