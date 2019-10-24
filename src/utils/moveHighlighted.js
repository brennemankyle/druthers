let decreaseOne = (value) => {
  if (value === 0) return value

  return value < 0 ? value + 1 : value - 1
}

let moveHighlighted = (items, distance, highlighted, defaultLast = false) => {
  if (items.length === 0) {
    return undefined
  }

  let defaultIndex = defaultLast ? items.length - 1 : 0
  let index = highlighted == null
    ? defaultIndex + decreaseOne(distance)
    : items.map((item) => item.value).indexOf(highlighted) + distance

  if (index < 0) index = items.length + index
  index = index % (items.length) // Wrap around

  if (items[index].value == null) { // Has no value, continue
    return moveHighlighted(items, distance < 0 ? distance-1 : distance+1, highlighted, defaultLast)
  } else {
    return items[index].value
  }
}

export default moveHighlighted
