import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import Layout from '../components/Layout'
import PostList from '../components/PostList'
import ProjectList from '../components/ProjectList'
import Seo from '../components/Seo'

const SectionHeading = ({ heading }) => {
  return (
    <Heading
      as='h2'
      fontWeight='600'
      fontSize='3xl'
      mr='auto'
      mb={4}
      borderBottomColor={useColorModeValue('brand.light', 'brand.dark')}
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
    photo: data.page.frontmatter.photo
  }
  const posts = data.posts.nodes.map(node => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    link: node.fields.slug,
    readingTime: node.fields.readingTime.text,
    excerpt: node.excerpt
  }))
  const projects = data.projects.nodes.map(node => ({
    title: node.frontmatter.title,
    description: node.frontmatter.description,
    link: node.frontmatter.link,
    maintained: node.frontmatter.maintained
  })).sort((p1, p2) => p1.title.localeCompare(
    p2.title, 
    'en', 
    { sensitivity: 'base' },
  ))

  return (
    <Layout>
      <Seo 
        title='Home'
        description={page.subheader}
        url='https://praz.dev'
      />
      <Stack spacing={12}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          mt={{ base: 4, sm: 7 }}
          align='center'
          justify='center'
        >
          <Box
            as={GatsbyImage}
            image={getImage(page.photo)}
            alt="photo of Sacha"
            boxSize='7rem'
            mr={{ base: 0, sm: 4 }}
            mb={{ base: 4, sm: 0 }}
            background='gray.400'
            borderRadius='full'
            borderWidth='2px'
            borderStyle='solid'
            borderColor={useColorModeValue('brand.light', 'brand.dark')}
          />
          <Stack direction='column' align='flex-start' justify='center'>
            <Heading
              as='h1'
              fontWeight='700'
              borderBottomColor={useColorModeValue('brand.light', 'brand.dark')}
              borderBottomWidth='2px'
            >
              {page.header}
            </Heading>
            <Text fontSize='lg'>{page.subheader}</Text>
          </Stack>
        </Flex>
        <Flex as='section' direction='column'>
          <SectionHeading heading='Latest posts' />
          <PostList posts={posts} isCondensed />
          <Text alignSelf={{ base: 'center', sm: 'flex-end' }} mt={6} mb={2}>
            <Link as={GatsbyLink} to='posts' fontSize='xl' fontWeight='400'>
              see all posts
            </Link>
          </Text>
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
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      limit: 3
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
        }
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
    page: mdx(fileAbsolutePath: { regex: "/content/pages/home/" }) {
      frontmatter {
        header
        subheader
        photo {
          childImageSharp {
            gatsbyImageData(
              width: 300,
              height: 300,
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`

export default IndexPage
