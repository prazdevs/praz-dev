import { Container } from '@chakra-ui/react'
import React from 'react'

import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as='main'
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
