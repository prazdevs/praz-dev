import {
  Badge,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import React from 'react'

const ProjectList = ({ projects }) => {
  return (
    <Stack direction='column' divider={<StackDivider />}>
      {projects.map(project => (
        <Stack key={project.title} direction='column'>
          <Stack direction='row' align='center'>
            <Heading as='h3' fontSize='xl' fontWeight='500'>
              <Link
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
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
