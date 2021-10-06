import { Icon, IconButton, useColorMode } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'

import FontContext from '../contexts/FontContext'

const ThemeButton = () => {
  const { isOpenDyslexic } = useContext(FontContext)
  const { colorMode, toggleColorMode } = useColorMode()

  const icon = isOpenDyslexic 
    ? colorMode === 'light' ? FaRegMoon : FaRegSun
    : colorMode === 'light' ? FiMoon : FiSun

  const label = `Switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={label}
      variant='outline'
      border='none'
      icon={<Icon boxSize={{ base: 7, sm: 5 }} as={icon} />}
    />
  )
}

export default ThemeButton
