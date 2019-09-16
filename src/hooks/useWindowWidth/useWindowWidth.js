// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import debounce from 'debounce'

let useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 50) // Debounce to improve performance
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return width
}

export default useWindowWidth
