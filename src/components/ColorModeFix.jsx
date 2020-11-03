import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/core'

const ColorModeFix = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode === '') {
      toggleColorMode()
    }
  }, [colorMode, toggleColorMode])

  return null
}

export default ColorModeFix
