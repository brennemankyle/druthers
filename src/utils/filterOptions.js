import _isEmpty from 'lodash/isEmpty'
import _without from 'lodash/without'
import _sortBy from 'lodash/sortBy'

let filterOptions = (searchTerm, selection, options, searchProps = ['label', 'value']) => {
  options = _without(options, ...selection)
  if (_isEmpty(searchTerm)) return options

  searchTerm = searchTerm.toLowerCase()

  options = options.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
    || item.value.toLowerCase() === searchTerm)

  options = _sortBy(options, [
    item => item.label.toLowerCase() === searchTerm,
    item => item.value.toLowerCase() === searchTerm,
    item => item.label.toLowerCase().startsWith(searchTerm),
    item => item.label.toLowerCase().endsWith(searchTerm),
  ]).reverse()

  // fuzzy search? https://fusejs.io/

  return options
}

export default filterOptions
