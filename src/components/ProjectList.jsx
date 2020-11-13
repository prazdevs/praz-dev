import {
  Badge,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import React from 'react'

import useColors from '../hooks/useColors'

const ProjectList = ({ projects }) => {
  const { primary, body } = useColors()

  return (
    <Stack direction='column' divider={<StackDivider />}>
      {projects.map(project => (
        <Stack key={project.title} direction='column'>
          <Stack direction='row' align='center'>
            <Heading
              as='h3'
              fontSize='xl'
              fontFamily='Montserrat'
              fontWeight='500'
            >
              <Link
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                borderBottomWidth='1px'
                borderBottomColor={body}
                transition='all 0.15s ease'
                _hover={{ color: primary, borderBottomColor: primary, pb: 1 }}
              >
                {project.title}
              </Link>
            </Heading>
            {project.maintained ? (
              <Badge colorScheme='green'>maintained</Badge>
            ) : null}
          </Stack>
          <Text>{project.description}</Text>
        </Stack>
      ))}
    </Stack>
  )
}

export default ProjectList
