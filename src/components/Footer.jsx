import { HStack, VStack, Text, Link, Icon } from '@chakra-ui/core'
import useColors from '../hooks/useColors'
import { Twitter, Linkedin, Github } from 'emotion-icons/simple-icons'

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
      <Icon aria-label={label} boxSize={8} as={icon} />
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
