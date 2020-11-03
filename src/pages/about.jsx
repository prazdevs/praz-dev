import SEO from '../components/Seo'
import Layout from '../components/Layout'
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/core'
import {
  ReactLogo,
  Javascript,
  Typescript,
  Redux,
  Mongodb,
  Nestjs,
  Cypress
} from 'emotion-icons/simple-icons'
import TechTag from '../components/TechTag'

const about = () => (
  <Layout>
    <SEO title='About' />
    <div>
      <Tag colorScheme='cyan' variant='subtle'>
        <TagLeftIcon as={ReactLogo} />
        <TagLabel>React</TagLabel>
      </Tag>
      <Tag colorScheme='yellow' variant='subtle'>
        <TagLeftIcon as={Javascript} />
        <TagLabel>JavaScript</TagLabel>
      </Tag>
      <Tag colorScheme='blue' variant='subtle'>
        <TagLeftIcon as={Typescript} />
        <TagLabel>TypeScript</TagLabel>
      </Tag>
      <Tag colorScheme='purple' variant='subtle'>
        <TagLeftIcon as={Redux} />
        <TagLabel>Redux</TagLabel>
      </Tag>
      <Tag colorScheme='green' variant='subtle'>
        <TagLeftIcon as={Mongodb} />
        <TagLabel>MongoDB</TagLabel>
      </Tag>
      <Tag colorScheme='red' variant='subtle'>
        <TagLeftIcon as={Nestjs} />
        <TagLabel>NestJS</TagLabel>
      </Tag>
      <Tag colorScheme='gray' variant='subtle'>
        <TagLeftIcon as={Cypress} />
        <TagLabel>Cypress</TagLabel>
      </Tag>
      <TechTag tech='react' />
    </div>
  </Layout>
)
export default about
