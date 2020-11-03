import { useColorMode } from '@chakra-ui/core'

const useColors = () => {
  const { colorMode } = useColorMode()
  const primary = colorMode === 'light' ? '#a72929' : '#ff8787'

  return { primary }
}

export default useColors
