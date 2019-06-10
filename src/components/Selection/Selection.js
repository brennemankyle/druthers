import React from 'react'
import PropTypes from 'prop-types'

let Selection = (props) => {
  return <span
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}
    onBlur={props.onBlur}>{props.selection.join(', ') || props.placeholder}</span>
}

Selection.defaultProps = {
  placeholder: '',
}

Selection.propTypes = {
  selection: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default Selection
