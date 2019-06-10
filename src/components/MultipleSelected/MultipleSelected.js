import React from 'react'
import PropTypes from 'prop-types'

let MultipleSelected = (props) => {
  return [
    props.selected && <div key="selected">{props.selected.join(', ')}</div>,
    <input type="text" value={props.placeholder} key="search" />,
  ]
}

MultipleSelected.defaultProps = {
  selected: [],
}

MultipleSelected.propTypes = {
  selected: PropTypes.array,
}

export default MultipleSelected
