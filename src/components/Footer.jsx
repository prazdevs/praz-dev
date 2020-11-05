import { Box } from '@chakra-ui/core'

const Footer = () => {
  return (
    <Box
      as='footer'
      w='full'
      textAlign='center'
      fontFamily='Montserrat'
      mt={12}
      py={2}
    >
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href='https://www.gatsbyjs.com'>Gatsby</a>
    </Box>
  )
}

export default Footer
