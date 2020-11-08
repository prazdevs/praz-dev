import { Flex, Heading, Stack, Text, Box } from '@chakra-ui/core'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

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
      fontWeight='600'
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
  const page = {
    header: data.page.frontmatter.header,
    subheader: data.page.frontmatter.subheader,
    photo: data.page.frontmatter.photo.childImageSharp.fixed
  }
  const articles = data.articles.nodes.map(node => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    link: node.fields.slug,
    readingTime: node.fields.readingTime.text
  }))
  const projects = data.projects.nodes.map(node => ({
    title: node.frontmatter.title,
    description: node.frontmatter.description,
    link: node.frontmatter.link,
    maintained: node.frontmatter.maintained,
    thumbnail: node.frontmatter.thumbnail.childImageSharp.fixed
  }))

  const { primary } = useColors()

  return (
    <Layout>
      <SEO title='Home' />
      <Stack spacing={12}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          mt={7}
          align='center'
          justify='center'
        >
          <Box
            as={Img}
            fixed={page.photo}
            boxSize='7rem'
            mr={{ base: 0, sm: 4 }}
            mb={{ base: 4, sm: 0 }}
            background='gray.400'
            borderRadius='full'
            borderWidth='2px'
            borderStyle='solid'
            borderColor={primary}
          />
          <Stack direction='column' align='flex-start' justify='center'>
            <Heading
              as='h1'
              fontFamily='Montserrat'
              fontWeight='700'
              borderBottomColor={primary}
              borderBottomWidth='2px'
            >
              {page.header}
            </Heading>
            <Text fontSize='lg'>{page.subheader}</Text>
          </Stack>
        </Flex>
        <Flex as='section' direction='column'>
          <SectionHeading heading='Latest articles' />
          <ArticleList articles={articles} isCondensed />
        </Flex>
        <Flex as='section' direction='column'>
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
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(locale: "en-gb", formatString: "ll")
          title
        }
      }
    }
    projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___maintained], order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          link
          description
          maintained
          thumbnail {
            childImageSharp {
              fixed(width: 48, height: 48) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
    page: mdx(fileAbsolutePath: { regex: "/content/pages/home/" }) {
      frontmatter {
        header
        subheader
        photo {
          childImageSharp {
            fixed(width: 112, height: 112) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`

export default IndexPage
