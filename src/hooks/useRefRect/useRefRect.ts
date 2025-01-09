// eslint-disable-next-line
import React, { useState, useEffect } from "react";

export interface DomRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  y: number;
  width: number;
  x: number;
}

function getRect(current: HTMLElement | undefined | null): DomRect {
  if (!current)
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: -window.innerWidth,
      y: -window.innerHeight,
    };

  let { top, bottom, left, right, width, height } = current.getClientRects()[0];

  let x = current.offsetLeft;
  let y = current.offsetTop;

  return { top, bottom, left, right, width, height, x, y };
}

function useRefRect(
  ref: React.MutableRefObject<HTMLElement | undefined | null> | null,
  skip: string[] = []
): DomRect {
  const [rect, setRect] = useState(getRect(undefined));

  useEffect(() => {
    setRect(getRect(ref?.current));
    // eslint-disable-next-line
  }, Object.values(getRect(ref?.current)).concat(skip));

  return rect;
}

export default useRefRect;
