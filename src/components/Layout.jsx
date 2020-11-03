import { Container } from '@chakra-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import ColorModeFix from './ColorModeFix'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <ColorModeFix />
      <Header />
      <Container
        as='main'
        fontFamily='Montserrat'
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

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
