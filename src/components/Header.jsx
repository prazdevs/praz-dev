import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { FiMenu as MenuIcon } from 'react-icons/fi'

import { MononokeIcon } from './MononokeIcon'
import ThemeButton from './ThemeButton'
import FontButton from './FontButton'

const NavLink = ({ label, link }) => {
  return (
    <Link
      as={GatsbyLink}
      to={link}
      fontSize={{ base: '2xl', sm: 'xl' }}
      variant='noUnderline'
      _activeLink={{
        color: useColorModeValue('brand.light', 'brand.dark')
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
      { link: '/posts', label: 'posts' }
    ].map(({ label, link }) => (
      <ListItem key={label}>
        <NavLink label={label} link={link} />
      </ListItem>
    ))}
  </Stack>
)

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as='header'
      pos='fixed'
      top='0'
      left='0'
      right='0'
      w='full'
      zIndex={1}
      borderBottomWidth='1px'
      backgroundColor={useColorModeValue('white', 'gray.800')}
      transition='background-color 0.2s'
    >
      <Box h={{ base: '3.5rem', sm: '4.5rem' }} maxW='62em' mx='auto'>
        <Flex w='full' h='full' px='4' align='center' justify='space-between'>
          <Flex fontSize='xl'>
            <MononokeIcon
              boxSize={8}
              mr={3}
              color={useColorModeValue('red.600', 'red.300')}
              aria-hidden='true'
              focusable='false'
            />
            <Text>praz.dev</Text>
          </Flex>
          <Stack spacing={6} direction='row' d={{ base: 'none', sm: 'flex' }}>
            <Flex as='nav'>
              <NavLinks spacing={4} direction='row' />
            </Flex>
            <Stack spacing={2} direction='row'>
              <ThemeButton />
              <FontButton />
            </Stack>
          </Stack>
          <IconButton
            aria-label='open menu'
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
                <Stack direction='row'>
                  <ThemeButton />
                  <FontButton />
                </Stack>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default Header
