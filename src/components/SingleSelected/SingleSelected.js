import React from 'react'
import PropTypes from 'prop-types'

let SingleSelected = (props) => {
  return <div
    tabIndex="0"
    onFocus={props.onFocus}
    onBlur={props.onBlur}>{props.selected.join(', ') || props.placeholder}</div>
}

SingleSelected.propTypes = {
  selected: PropTypes.array.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default SingleSelected
