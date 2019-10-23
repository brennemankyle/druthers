import { isEmpty, without, sortBy } from './essentialLodash'
import FuzzySet from 'fuzzyset.js'
import allOptions from './allOptions'

let fuzzySearch = (item, searchTerm) => {
  let fuzzy = FuzzySet()
  fuzzy.add(item.label.toLowerCase())
  let result = fuzzy.get(searchTerm)

  return result ? result.length : false
}

let filterOptions = (searchTerm, selection, options, searchProps = ['label', 'value']) => {
  options = without(options, selection) // TODO
  if (isEmpty(searchTerm)) return options

  searchTerm = searchTerm.toLowerCase()

  options = allOptions(options, 'filter', item =>
    item.label.toLowerCase().includes(searchTerm)
    || item.value.toLowerCase() === searchTerm
    || fuzzySearch(item, searchTerm))

  options = sortBy(options, [ // TODO
    item => item.label.toLowerCase() === searchTerm,
    item => item.value.toLowerCase() === searchTerm,
    item => item.label.toLowerCase().startsWith(searchTerm),
    item => item.label.toLowerCase().endsWith(searchTerm),
    item => fuzzySearch(item, searchTerm),
  ])

  return options
}

export default filterOptions
