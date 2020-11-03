import { Box } from '@chakra-ui/core'

const Footer = () => {
  return (
    <Box as='footer' w='full' align='center' fontFamily='Montserrat'>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href='https://www.gatsbyjs.com'>Gatsby</a>
    </Box>
  )
}

export default Footer
