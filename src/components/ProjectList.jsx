import {
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React from 'react'

import TechTag from './TechTag'

const ProjectList = ({ projects, isCondensed }) => {
  console.log(projects)
  return (
    <Stack direction='column' divider={<StackDivider />} spacing={4}>
      {projects.map(project => (
        <Stack key={project.title} direction='column' spacing={3}>
          <Stack direction='row' align='center'>
          <Heading 
              as={isCondensed ? 'h3' : 'h2'} 
              fontSize='xl' 
              fontWeight={isCondensed ? '500' : '600'}
            >
              <Link
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                {project.title}
              </Link>
            </Heading>
          </Stack>
          {isCondensed ? null : (
            <Wrap>
              {project.tags.map(tag => (
                <WrapItem key={tag}>
                  <TechTag tech={tag} />
                </WrapItem>
              ))}
            </Wrap>
          )}
          <Text>{project.description}</Text>
        </Stack>
      ))}
    </Stack>
  )
}

export default ProjectList
