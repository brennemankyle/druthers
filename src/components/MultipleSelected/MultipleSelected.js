import React from 'react'
import PropTypes from 'prop-types'

let MultipleSelected = (props) => {
  let { Search } = props.components

  return [
    props.selected && <span key="selected">{props.selected.join(', ')}</span>,
    <Search
      searchText={props.searchText}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      key="search" />,
  ]
}

MultipleSelected.propTypes = {
  selected: PropTypes.array.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default MultipleSelected
