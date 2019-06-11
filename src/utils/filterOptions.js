import {
  pipe,
  without,
  filter,
  props,
  toLower,
  any,
  contains,
  curry,
  equals,
  sortWith,
  comparator,
  isEmpty,
  startsWith,
  endsWith,
} from 'ramda'

let containsIgnoreCase = curry((a, b) => contains(toLower(a), toLower(b)))
let equalsIgnoreCase = curry((a, b) => equals(toLower(a), toLower(b)))
let startsWithIgnoreCase = curry((a, b) => startsWith(toLower(a), toLower(b)))
let endsWithIgnoreCase = curry((a, b) => endsWith(toLower(a), toLower(b)))

let filterOptions = (searchTerm, selection, options, searchProps = ['label', 'value']) => {
  if (isEmpty(searchTerm)) return without(selection, options)

  let checkOption = (func) => pipe(props(searchProps), any(func))
  let containsSearch = containsIgnoreCase(searchTerm)
  let equalsSearch = equalsIgnoreCase(searchTerm)
  let startsWithSearch = startsWithIgnoreCase(searchTerm)
  let endsWithSearch = endsWithIgnoreCase(searchTerm)

  let optionsContainsSearch = filter(checkOption(containsSearch))

  let searchSort = sortWith([
    comparator(checkOption(equalsSearch)),
    comparator(checkOption(startsWithSearch)),
    comparator(checkOption(endsWithSearch)),
  ])

  return pipe(without(selection), optionsContainsSearch, searchSort)(options)
}

export default filterOptions
