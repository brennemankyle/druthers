let withKeys = (obj, startsWith, not = false) => {
  startsWith = Array.isArray(startsWith) ? startsWith : [startsWith]

  return Object.keys(obj).reduce((acc, key) => {
    let condition = startsWith.some(word => key.startsWith(word))
    condition = not ? !condition : condition
    if (condition) acc[key] = obj[key]

    return acc
  }, {})
}

export default withKeys
