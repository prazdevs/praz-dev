import { Link } from 'gatsby'

const { Box, Stack, HStack } = require('@chakra-ui/core')

const HorizontalNav = () => {
  return (
    <nav>
      <HStack as="ul">
        <li style={{ listStyleType: 'none' }}>
          <Link to="/">home</Link>
        </li>
        <li style={{ listStyleType: 'none' }}>
          <Link to="/articles">articles</Link>
        </li>
        <li style={{ listStyleType: 'none' }}>
          <Link to="/about">about me</Link>
        </li>
      </HStack>
    </nav>
  )
}

const Header = () => {
  return (
    <header>
      <Box>
        <HorizontalNav />
      </Box>
    </header>
  )
}

export default Header
