import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/jetbrains-mono'
import '@fontsource/marck-script'

import React from 'react'
import { FontProvider } from './src/contexts/FontContext'

export const wrapRootElement = ({ element }) => (
  <FontProvider>{element}</FontProvider>
)
