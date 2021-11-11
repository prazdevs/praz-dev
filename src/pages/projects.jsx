import React from 'react'
import { graphql } from 'gatsby'
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import Layout from '../components/Layout'
import ProjectList from '../components/ProjectList'
import Seo from '../components/Seo'

const ProjectsPage = ({ data }) => {
  const projects = data.projects.nodes.map(node => ({
    ...node.frontmatter,
  })).sort((p1, p2) => p1.title.localeCompare(
    p2.title, 
    'en', 
    { sensitivity: 'base' },
  ))

  const  { header, subheader } = data.page.frontmatter

  return (
    <Layout>
      <Seo 
        title='Projects'
        description={subheader}
        url='https://praz.dev/projects'
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
        <ProjectList projects={projects} />
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query {
    projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
    ) {
      nodes {
        frontmatter {
          title
          link
          description
          tags
        }
      }
    }
    page: mdx(fileAbsolutePath: { regex: "/content/pages/projects/" }) {
      frontmatter {
        header
        subheader
      }
    }
  }
`

export default ProjectsPage