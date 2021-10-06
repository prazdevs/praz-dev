import { Container } from '@chakra-ui/react'
import React, { useContext } from 'react'

import Footer from './Footer'
import Header from './Header'
import FontContext from '../contexts/FontContext'

const Layout = ({ children }) => {
  const { font } = useContext(FontContext)

  return (
    <>
      <Header />
      <Container
        as='main'
        fontFamily={font}
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
