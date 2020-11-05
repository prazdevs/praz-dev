import {
  Badge,
  Box,
  Flex,
  Link,
  List,
  ListItem,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/core'
import Img from 'gatsby-image'

import useColors from '../hooks/useColors'

const ProjectList = ({ projects }) => {
  const { primary } = useColors()

  return (
    <Stack as={List} direction='column' divider={<StackDivider />}>
      {projects.map((project, idx) => (
        <ListItem key={project.title}>
          <Flex
            as={Link}
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            direction='row'
            align='center'
            role='group'
            aria-labelledby={`project-${idx}`}
            _hover={{ color: primary, textDecor: 'none' }}
          >
            <Box
              as={Img}
              boxSize='3rem'
              width='3rem'
              height='3rem'
              fixed={project.thumbnail}
              mr={3}
              borderRadius='full'
              display={{ base: 'none', sm: 'inline-flex' }}
              _groupHover={{
                borderColor: primary,
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
            />
            <Stack direction='column'>
              <Stack direction='row' align='center'>
                <Text fontSize='xl' id={`project-${idx}`}>
                  {project.title}
                </Text>
                {project.maintained ? (
                  <Badge colorScheme='green'>maintained</Badge>
                ) : null}
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
