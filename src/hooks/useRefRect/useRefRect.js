// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

let getRect = (current) => {
  if (!current) return {top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0}
  let {top, bottom, left, right, width, height, x, y} = current.getBoundingClientRect()
  x += window.scrollX
  y += window.scrollY
  return {top, bottom, left, right, width, height, x, y}
}

let useRefRect = (ref, skip = []) => {
  const [rect, setRect] = useState(getRect())

  useEffect(() => {
    setRect(getRect(ref.current))
    // eslint-disable-next-line
  }, Object.values(getRect(ref.current)).concat(skip))

  return rect
}

export default useRefRect
