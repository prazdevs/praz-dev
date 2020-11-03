import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/core'

import { Link as GatsbyLink } from 'gatsby'
import { Menu as MenuIcon } from 'emotion-icons/boxicons-regular'
import { MononokeIcon } from './MononokeIcon'
import ThemeButton from './ThemeButton'
import useColors from '../hooks/useColors'

const NavLink = ({ label, link }) => {
  const { primary } = useColors()

  return (
    <Link
      as={GatsbyLink}
      to={link}
      fontSize={{ base: '2xl', sm: 'xl' }}
      _hover={{
        color: primary,
        textDecor: 'none'
      }}
      _activeLink={{
        color: primary
      }}
    >
      {label}
    </Link>
  )
}

const NavLinks = ({ spacing, direction }) => (
  <Stack as={List} direction={direction} align='center' spacing={spacing}>
    {[
      { link: '/', label: 'home' },
      { link: '/articles', label: 'articles' },
      { link: '/about', label: 'about' }
    ].map(({ label, link }) => (
      <ListItem key={label}>
        <NavLink label={label} link={link} />
      </ListItem>
    ))}
  </Stack>
)

const Header = () => {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as='header'
      pos='fixed'
      top='0'
      left='0'
      right='0'
      w='full'
      borderBottomWidth='1px'
      fontFamily='Montserrat'
      background={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <Box h={{ base: '3.5rem', sm: '4.5rem' }} maxW='62em' mx='auto'>
        <Flex w='full' h='full' px='4' align='center' justify='space-between'>
          <Flex fontSize='xl'>
            <MononokeIcon
              boxSize={8}
              mr={3}
              color={colorMode === 'light' ? 'red.600' : 'red.300'}
            />
            <Text>praz.dev</Text>
          </Flex>
          <Stack spacing={6} direction='row' d={{ base: 'none', sm: 'flex' }}>
            <Flex as='nav' role='navigation'>
              <NavLinks spacing={4} direction='row' />
            </Flex>
            <ThemeButton />
          </Stack>
          <IconButton
            onClick={onOpen}
            d={{ base: 'flex', sm: 'none' }}
            variant='outline'
            border='none'
            icon={<Icon boxSize={6} as={MenuIcon} />}
          />
        </Flex>
      </Box>
      <Drawer
        isFullHeight={true}
        placement='top'
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody
              as={Flex}
              direction='column'
              align='center'
              justify='center'
            >
              <Stack direction='column' spacing={6}>
                <NavLinks spacing={6} direction='column' />
                <ThemeButton />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default Header
