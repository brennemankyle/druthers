// Functions that we need from lodash, but implemented here so we don't have to install all of lodash

function castArray(value) {
  return Array.isArray(value) ? value : [value]
}

function without(array, values) {
  return array.filter((value) => !castArray(values).includes(value))
}

function isEmpty(value) {
  if (value == null) {
    return true
  }

  if (Array.isArray(value) || typeof value == 'string') {
    return !value.length
  }

  if (value && value.size != null) {
    return !value.size
  }

  for (let key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }

  return true
}

function last(array) {
  let length = array == null ? 0 : array.length

  return length ? array[length - 1] : undefined
}

function inRange(number, start, end) {
  if (end === undefined) {
    end = start
    start = 0
  }

  return number >= Math.min(start, end) && number < Math.max(start, end)
}

function sortBy(array, funcs) {
  let length = funcs.length

  let priority = value =>
    funcs.reduce(
      (acc, func, index) => Math.max(acc, func(value) ? (length - index) : Number.MIN_SAFE_INTEGER),
      0)

  return array
    .map(value => ({ value, priority: priority(value)}))
    .sort((a, b) => b.priority - a.priority)
    .map(item => item.value)
}

export {
  sortBy,
  inRange,
  without,
  castArray,
  isEmpty,
  last,
}
