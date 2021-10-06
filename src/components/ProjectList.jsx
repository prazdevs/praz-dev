import {
  Badge,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import React, { useContext } from 'react'

import FontContext from '../contexts/FontContext'

const ProjectList = ({ projects }) => {
  const { font } = useContext(FontContext)

  return (
    <Stack direction='column' divider={<StackDivider />}>
      {projects.map(project => (
        <Stack key={project.title} direction='column'>
          <Stack direction='row' align='center'>
            <Heading as='h3' fontFamily={font} fontSize='xl' fontWeight='500'>
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
