import { isEmpty, without, sortBy } from './essentialLodash'

let filterOptions = (searchTerm, selection, options, searchProps = ['label', 'value']) => {
  options = without(options, selection)
  if (isEmpty(searchTerm)) return options

  searchTerm = searchTerm.toLowerCase()

  options = options.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
    || item.value.toLowerCase() === searchTerm)

  options = sortBy(options, [
    item => item.label.toLowerCase() === searchTerm,
    item => item.value.toLowerCase() === searchTerm,
    item => item.label.toLowerCase().startsWith(searchTerm),
    item => item.label.toLowerCase().endsWith(searchTerm),
  ])

  // fuzzy search? https://fusejs.io/

  return options
}

export default filterOptions
