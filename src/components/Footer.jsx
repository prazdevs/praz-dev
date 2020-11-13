import {
  HStack,
  Icon,
  Link,
  Text,
  VisuallyHidden,
  VStack
} from '@chakra-ui/core'
import { Github, Linkedin, Twitter } from '@icons-pack/react-simple-icons'

import useColors from '../hooks/useColors'

const ExtLink = props => {
  const { body, primary } = useColors()
  return (
    <Link
      {...props}
      isExternal
      target='_blank'
      rel='noopener noreferrer'
      borderBottomWidth='1px'
      borderBottomColor={body}
      transition='all 0.15s ease'
      fontWeight='500'
      _hover={{ color: primary, borderBottomColor: primary, pb: 1 }}
    />
  )
}

const SocialLink = ({ link, icon, label }) => {
  const { primary } = useColors()
  return (
    <Link
      href={link}
      isExternal
      target='_blank'
      rel='noopener noreferrer'
      _hover={{ color: primary }}
    >
      <Icon boxSize={8} as={icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Link>
  )
}

const Footer = () => {
  return (
    <VStack
      as='footer'
      w='full'
      spacing={6}
      textAlign='center'
      fontFamily='Montserrat'
      mt={20}
      mb={2}
    >
      <HStack spacing={7}>
        <SocialLink
          link='https://twitter.com/PrazDevs'
          label="Sacha's Twitter profile"
          icon={Twitter}
        />
        <SocialLink
          link='https://github.com/prazdevs'
          label="Sacha's Github profile"
          icon={Github}
        />
        <SocialLink
          link='https://www.linkedin.com/in/sacha-bouillez/'
          label="Sacha's Linkedin profile"
          icon={Linkedin}
        />
      </HStack>
      <VStack>
        <Text>
          Made with{' '}
          <span role='img' aria-label='love'>
            ❤
          </span>
          ️ using <ExtLink href='https://www.gatsbyjs.com/'>Gatsby</ExtLink> and{' '}
          <ExtLink href='https://chakra-ui.com/'>Chakra</ExtLink>, hosted on{' '}
          <ExtLink href='https://www.netlify.com/'>Netlify</ExtLink>.
        </Text>
        <Text>©{new Date().getFullYear()} — Sacha 'PraZ' Bouillez</Text>
      </VStack>
    </VStack>
  )
}

export default Footer
