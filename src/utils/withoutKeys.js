import withKeys from './withKeys'

let withoutKeys = (obj, startsWith) => {
  return withKeys(obj, startsWith, true)
}

export default withoutKeys
