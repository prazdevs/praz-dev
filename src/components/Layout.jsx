import { Container } from '@chakra-ui/core'

import ColorModeFix from './ColorModeFix'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <ColorModeFix />
      <Header />
      <Container
        as='main'
        fontFamily='Montserrat'
        fontWeight='300'
        maxW='62em'
        mt={{ base: '3.5rem', sm: '4.5rem' }}
        pt='1rem'
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
