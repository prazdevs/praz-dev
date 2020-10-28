import { useEffect, useRef } from 'react'

const useEventListener = (eventName, handler, element) => {
  const savedHandler = useRef()

  useEffect(() => {
    const targetElement = element?.current || window
    if (!targetElement?.addEventListener) return

    if (savedHandler.current !== handler) savedHandler.current = handler

    const eventListener = e => {
      if (!!savedHandler?.current) {
        savedHandler.current(e)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    return () => targetElement.removeEventListener(eventName, eventListener)
  }, [eventName, element, handler])
}

export default useEventListener
