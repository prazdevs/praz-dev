import {
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { FiCalendar, FiWatch } from 'react-icons/fi'

import TechTag from './TechTag'

const PostList = ({ posts, isCondensed }) => {
  return (
    <Stack direction='column' divider={<StackDivider />} spacing={4}>
      {posts.map(post => (
        <Stack key={post.title} direction='column' spacing={3}>
          <Heading
            as={isCondensed ? 'h3' : 'h2'}
            fontSize='xl'
            fontWeight={isCondensed ? '500' : '600'}
          >
            <Link as={GatsbyLink} to={post.link}>
              {post.title}
            </Link>
          </Heading>

          <HStack fontWeight='500'>
            <Icon as={FiCalendar} boxSize={5} />
            <Text mr={2}>{post.date}</Text>
            <Icon as={FiWatch} boxSize={5} />
            <Text>{post.readingTime}</Text>
          </HStack>
          {isCondensed ? null : (
            <Wrap>
              {post.tags.map(tag => (
                <WrapItem key={tag}>
                  <TechTag tech={tag} />
                </WrapItem>
              ))}
            </Wrap>
          )}
          <Text>{post.excerpt}</Text>
        </Stack>
      ))}
    </Stack>
  )
}
export default PostList
