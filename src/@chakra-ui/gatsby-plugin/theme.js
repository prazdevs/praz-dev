import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  colors: {
    brand: {
      dark: '#ff8787',
      light: '#b60000'
    }
  },
  fonts: {
    body: 'Montserrat, system-ui, sans-serif',
    heading: 'Montserrat, Georgia, serif',
    mono: 'Jetbrains Mono, Menlo, monospace'
  },
  components: {
    Link: {
      baseStyle: props => ({
        transition: 'all 0.15s ease',
        borderBottomWidth: '1px',
        borderBottomColor: mode('gray.800', 'white')(props),
        _hover: {
          color: mode('brand.light', 'brand.dark')(props),
          borderBottomColor: mode('brand.light', 'brand.dark')(props),
          pb: 1
        }
      }),
      variants: {
        noUnderline: {
          borderBottom: 'none',
          _hover: {
            pb: 0
          }
        }
      }
    }
  }
})

console.log(theme.components.Link)

export default theme
