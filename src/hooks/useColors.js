import { useColorMode } from '@chakra-ui/core'

const useColors = () => {
  const { colorMode } = useColorMode()
  const primary = colorMode === 'light' ? '#b60000' : '#ff8787'

  return { primary }
}

export default useColors
