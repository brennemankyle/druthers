import React from 'react'
import PropTypes from 'prop-types'

let SelectionContainer = (props) => {
  return <div
    className={props.className}
    tabIndex={'-1'}
    onFocus={props.onFocus}
    onBlur={props.onBlur}>
      {props.children}
      <span className="divider"></span>
      <img className="expand" src="expand.png" alt="expand" /></div>
}

SelectionContainer.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired,
  hasOptions: PropTypes.bool.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  areOptionsOpen: PropTypes.bool.isRequired,
}

export default SelectionContainer
