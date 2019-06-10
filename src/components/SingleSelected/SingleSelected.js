import React from 'react'
import PropTypes from 'prop-types'

let SingleSelected = (props) => {
  return <div>{props.selected.join(', ') || props.placeholder}</div>
}

SingleSelected.defaultProps = {
  selected: [],
}

SingleSelected.propTypes = {
  selected: PropTypes.array,
}

export default SingleSelected
