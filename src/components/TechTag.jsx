import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import {
  Heroku,
  Javascript,
  Mongodb,
  Nestjs,
  Nodedotjs,
  ReactJs,
  Redux,
  Rust,
  Typescript,
  Vuedotjs,
  Cypress,
  Gatsby,
  Vite
} from '@icons-pack/react-simple-icons'
import React from 'react'
import { FiCoffee } from 'react-icons/fi'
import { ImAccessibility } from 'react-icons/im'

const tagValues = tech => {
  switch (tech) {
    case 'vue':
      return {
        label: 'Vue',
        color: 'green',
        icon: Vuedotjs
      }
    case 'react':
      return {
        label: 'React',
        color: 'cyan',
        icon: ReactJs
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
        icon: Nodedotjs
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
    case 'rust':
      return {
        label: 'Rust',
        color: 'orange',
        icon: Rust
      }
    case 'storytime':
      return {
        label: 'Storytime',
        color: 'pink',
        icon: FiCoffee
      }
    case 'a11y':
      return {
        label: 'Accessibility',
        color: 'orange',
        icon: ImAccessibility
      }
    case 'cypress':
      return {
        label: 'Cypress',
        color: 'gray',
        icon: Cypress
      }
    case 'gatsby':
      return {
        label: 'Gatsby',
        color: 'purple',
        icon: Gatsby
      }
    case 'vite':
      return {
        label: 'Vite',
        color: 'yellow',
        icon: Vite
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
