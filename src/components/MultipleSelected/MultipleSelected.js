import React from 'react'
import PropTypes from 'prop-types'

let MultipleSelected = (props) => {
  let { Search } = props.components

  return [
    props.selected && <span key="selected">{props.selected.join(', ')}</span>,
    <Search
      searchPlaceholder={props.searchPlaceholder}
      searchText={props.searchText}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={props.onSearch}
      key="search" />,
  ]
}

MultipleSelected.propTypes = {
  selected: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default MultipleSelected
