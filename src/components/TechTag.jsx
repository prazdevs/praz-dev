import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/core'
import {
  ReactLogo,
  Redux,
  Nestjs,
  Typescript,
  Mongodb,
  NodeDotJs,
  Heroku,
  Javascript
} from 'emotion-icons/simple-icons'

const tagValues = tech => {
  switch (tech) {
    case 'react':
      return {
        label: 'React',
        color: 'cyan',
        icon: ReactLogo
      }
    case 'redux':
      return {
        label: 'Redux',
        color: 'purple',
        icon: Redux
      }
    case 'nest':
      return {
        label: 'Nest',
        color: 'red',
        icon: Nestjs
      }
    case 'typescript':
      return {
        label: 'TypeScript',
        color: 'blue',
        icon: Typescript
      }
    case 'mongodb':
      return {
        label: 'MongoDB',
        color: 'green',
        icon: Mongodb
      }
    case 'node':
      return {
        label: 'Node',
        color: 'green',
        icon: NodeDotJs
      }
    case 'heroku':
      return {
        label: 'Heroku',
        color: 'purple',
        icon: Heroku
      }
    case 'javascript':
      return {
        label: 'JavaScript',
        color: 'yellow',
        icon: Javascript
      }
    default:
      return { label: tech, color: undefined, icon: null }
  }
}

const TechTag = ({ tech }) => {
  const tag = tagValues(tech)

  return (
    <Tag colorScheme={tag.color}>
      {tag.icon ? <TagLeftIcon as={tag.icon} /> : null}
      <TagLabel>{tag.label}</TagLabel>
    </Tag>
  )
}

export default TechTag
