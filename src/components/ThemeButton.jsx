import { useColorMode, IconButton, Icon } from '@chakra-ui/core'
import { Moon, Sun } from 'emotion-icons/feather'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const icon = colorMode === 'light' ? Moon : Sun
  const label = `Switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={label}
      variant='outline'
      border='none'
      icon={<Icon boxSize={6} as={icon} />}
    />
  )
}

export default ThemeButton
