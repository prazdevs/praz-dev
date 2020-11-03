import {
  Avatar,
  Flex,
  Heading,
  Icon,
  List,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
  StackDivider
} from '@chakra-ui/core'
import { Calendar, Watch } from 'emotion-icons/feather'
import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import useColors from '../hooks/useColors'
import thumbnail from './article.jpg'

const mockPosts = [
  {
    title: 'My first post',
    date: '2020-11-03',
    read: '1 min read',
    tags: ['react', 'redux']
  },
  {
    title: 'My second post with an extremely uselessly long name',
    date: '2020-11-06',
    read: '3 min read',
    tags: ['firebase', 'vue']
  },
  {
    title: 'My third post, thats it',
    date: '2020-11-16',
    read: '3 min read',
    tags: ['storytime', 'javascript']
  },
  {
    title: 'My final post for the tests',
    date: '2020-11-26',
    read: '3 min read',
    tags: ['firebase', 'vue']
  }
]

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

const IndexPage = () => {
  const { primary } = useColors()

  return (
    <Layout>
      <SEO title='Home' />
      <Stack spacing={12}>
        <Flex direction='column'>
          <SectionHeading heading='Latest articles' />
          <Stack as={List} direction='column' divider={<StackDivider />}>
            {mockPosts.map(article => (
              <Flex direction='row' align='center'>
                <Avatar
                  size='lg'
                  src={thumbnail}
                  mr={3}
                  display={{ base: 'none', sm: 'inline-flex' }}
                />
                <Stack direction='column'>
                  <Text fontSize='xl'>{article.title}</Text>
                  <Wrap>
                    {article.tags.map(tag => (
                      <WrapItem>
                        <Tag>{tag}</Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Stack direction='row' align='center'>
                    <Icon as={Calendar} boxSize={5} />
                    <Text mr={2}>{article.date}</Text>
                    <Icon as={Watch} boxSize={5} />
                    <Text>{article.read}</Text>
                  </Stack>
                </Stack>
              </Flex>
            ))}
          </Stack>
        </Flex>
        <Flex direction='column'>
          <SectionHeading heading='Projects' />
        </Flex>
      </Stack>
    </Layout>
  )
}

export default IndexPage
