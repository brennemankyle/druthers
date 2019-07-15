// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import _debounce from 'lodash/debounce'

let useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = _debounce(() => setWidth(window.innerWidth), 50)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return width
}

export default useWindowWidth
