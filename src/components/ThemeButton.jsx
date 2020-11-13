import { Icon, IconButton, useColorMode } from '@chakra-ui/core'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const icon = colorMode === 'light' ? FiMoon : FiSun
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
