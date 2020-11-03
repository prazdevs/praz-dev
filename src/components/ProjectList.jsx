import {
  Avatar,
  Badge,
  Flex,
  Link,
  List,
  ListItem,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/core'

import useColors from '../hooks/useColors'
import thumbnail from './article.jpg'

const ProjectList = ({ projects }) => {
  const { primary } = useColors()

  return (
    <Stack as={List} direction='column' divider={<StackDivider />}>
      {projects.map(project => (
        <ListItem key={project.title}>
          <Flex
            as={Link}
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            direction='row'
            align='center'
            role='group'
            _hover={{ color: primary, textDecor: 'none' }}
          >
            <Avatar
              size='md'
              src={thumbnail}
              mr={3}
              display={{ base: 'none', sm: 'inline-flex' }}
              _groupHover={{ borderColor: primary, borderWidth: '2px' }}
            />
            <Stack direction='column'>
              <Stack direction='row' align='center'>
                <Text fontSize='xl'>{project.title}</Text>
                <Badge colorScheme={project.maintained ? 'green' : 'red'}>
                  {project.maintained ? 'maintained' : 'abandoned'}
                </Badge>
              </Stack>
              <Text>{project.description}</Text>
            </Stack>
          </Flex>
        </ListItem>
      ))}
    </Stack>
  )
}

export default ProjectList
