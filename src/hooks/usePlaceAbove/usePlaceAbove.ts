import React, { useState, useEffect } from "react";
import { DomRect } from "../useRefRect/useRefRect";

function usePlaceAbove(
  rect: DomRect,
  optionsWrapperRect: DomRect,
  skip: any[] = []
): boolean {
  const [placeOptionsAbove, setPlaceOptionsAbove] = useState(false);

  // if no space below, place above
  useEffect(() => {
    let windowHeight = window.innerHeight + window.scrollY;
    let belowDiff =
      windowHeight - (rect.y + rect.height + optionsWrapperRect.height);
    let aboveDiff = rect.y - optionsWrapperRect.height;
    setPlaceOptionsAbove(belowDiff < 0 && aboveDiff > belowDiff);

    // eslint-disable-next-line
  }, [rect, optionsWrapperRect].concat(skip));

  return placeOptionsAbove;
}

export default usePlaceAbove;
