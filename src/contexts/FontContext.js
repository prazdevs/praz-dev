import React, { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FontContext = createContext({
  font: 'Montserrat',
  isOpenDyslexic: false,
  toggleFont: () => {}
})

export const FontProvider = ({ children }) => {
  const [isOpenDyslexic, setIsOpenDyslexic] = useLocalStorage('open-dyslexic', false)

  const font = isOpenDyslexic ? 'OpenDyslexic' : 'Montserrat'

  const toggleFont = () => {
    setIsOpenDyslexic(!isOpenDyslexic)
  }

  return (
    <FontContext.Provider value={{ font, toggleFont, isOpenDyslexic }}>
      {children}
    </FontContext.Provider>
  )
}

export default FontContext
