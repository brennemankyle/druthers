// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

let usePlaceAbove = (areOptionsOpen, rect, optionContainerRect, skip = []) => {
  const [placeOptionsAbove, setPlaceOptionsAbove] = useState(false)

  useEffect(() => {
    if (areOptionsOpen) {
      let windowHeight = window.innerHeight + window.scrollY
      let belowDiff = windowHeight - (rect.y + rect.height + optionContainerRect.height)
      let aboveDiff = rect.y - optionContainerRect.height
      setPlaceOptionsAbove(belowDiff < 0 && aboveDiff > belowDiff)
    }
    // eslint-disable-next-line
  }, [areOptionsOpen, rect, optionContainerRect].concat(skip))

  return placeOptionsAbove
}

export default usePlaceAbove
