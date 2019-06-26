import React from 'react'
import PropTypes from 'prop-types'

let SelectionContainer = (props) => {
  return <div
    className={props.className}
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}>
      {props.children}
      <span className="divider"></span>
      <img className="expand" src="expand.png" alt="expand" /></div>
}

SelectionContainer.propTypes = {
  onFocus: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
  hasOptions: PropTypes.bool.isRequired,
  areOptionsOpen: PropTypes.bool.isRequired,
}

export default SelectionContainer
