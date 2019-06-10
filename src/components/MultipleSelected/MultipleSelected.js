import React from 'react'
import PropTypes from 'prop-types'

let MultipleSelected = (props) => {
  let { Search } = props.components

  return [
    props.selected && <span key="selected">{props.selected.join(', ')}</span>,
    <Search searchText={props.searchText} key="search" />,
  ]
}

MultipleSelected.defaultProps = {
  selected: [],
}

MultipleSelected.propTypes = {
  selected: PropTypes.array,
}

export default MultipleSelected
