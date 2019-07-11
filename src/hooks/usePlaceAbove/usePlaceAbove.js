// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

let usePlaceAbove = (rect, optionWrapperRect, skip = []) => {
  const [placeOptionsAbove, setPlaceOptionsAbove] = useState(false)

  useEffect(() => {
    let windowHeight = window.innerHeight + window.scrollY
    let belowDiff = windowHeight - (rect.y + rect.height + optionWrapperRect.height)
    let aboveDiff = rect.y - optionWrapperRect.height
    setPlaceOptionsAbove(belowDiff < 0 && aboveDiff > belowDiff)

    // eslint-disable-next-line
  }, [rect, optionWrapperRect].concat(skip))

  return placeOptionsAbove
}

export default usePlaceAbove
