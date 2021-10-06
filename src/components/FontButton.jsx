import { Icon, IconButton, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FiBold } from 'react-icons/fi'
import { FaBold } from 'react-icons/fa'
import FontContext from '../contexts/FontContext'

const FontButton = () => {
  const { toggleFont, isOpenDyslexic } = useContext(FontContext)
  const brandColor = useColorModeValue('brand.light', 'brand.dark')

  const icon = isOpenDyslexic ? FaBold : FiBold
  const color = isOpenDyslexic ? brandColor : ''
  const label = isOpenDyslexic
    ? 'Disable dyslexia friendly font'
    : 'Enable dyslexia friendly font'

  return (
    <IconButton
      onClick={toggleFont}
      aria-label={label}
      variant='outline'
      border='none'
      color={color}
      icon={<Icon boxSize={{ base: 7, sm: 5 }} as={icon} />}
    />
  )
}

export default FontButton
