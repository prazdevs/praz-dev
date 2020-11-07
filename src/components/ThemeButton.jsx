import { useColorMode, IconButton, Icon } from '@chakra-ui/core'
import { Moon, Sunny } from 'emotion-icons/ionicons-outline'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const icon = colorMode === 'light' ? Moon : Sunny
  const label = `Switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={label}
      variant='outline'
      border='none'
      icon={<Icon boxSize={{ base: 8, sm: 6 }} as={icon} />}
    />
  )
}

export default ThemeButton
