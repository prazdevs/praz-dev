import { useColorModeValue } from '@chakra-ui/react'

const useColors = () => {
  const primary = useColorModeValue('#b60000', '#ff8787')
  const body = useColorModeValue('#1A202C', '#ffffffeb')

  return { primary, body }
}

export default useColors
