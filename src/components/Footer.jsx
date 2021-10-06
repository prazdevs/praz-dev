import {
  HStack,
  Icon,
  Link,
  Text,
  VisuallyHidden,
  VStack
} from '@chakra-ui/react'
import { Github, Linkedin, Twitter } from '@icons-pack/react-simple-icons'
import React, { useContext } from 'react'

import FontContext from '../contexts/FontContext'

const ExtLink = props => {
  return (
    <Link
      {...props}
      isExternal
      target='_blank'
      rel='noopener noreferrer'
      fontWeight='500'
    />
  )
}

const SocialLink = ({ link, icon, label }) => {
  return (
    <Link
      href={link}
      isExternal
      target='_blank'
      rel='noopener noreferrer'
      variant='noUnderline'
    >
      <Icon boxSize={8} as={icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Link>
  )
}

const Footer = () => {
  const { font } = useContext(FontContext)

  return (
    <VStack as='footer' fontFamily={font} w='full' spacing={6} textAlign='center' mt={20} mb={2}>
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
          link='https://www.linkedin.com/in/sachabouillez/'
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
