import React from 'react'
import PropTypes from 'prop-types'

let SelectionContainer = (props) => {
  let onFocus = (e) => {
    if (!props.areOptionsOpen) {
      props.onFocus(e)
    } else {
      e.target.blur() // Close if already open options
    }
  }
  let onBlur = (e) => {
    if (e.target.classList.contains('search')) {
      setTimeout(() => { // Call blur after focus event
        props.onBlur(e)
      })
    }
  }

  return <div
    className={props.className}
    tabIndex={props.disabled ? 'false' : '-1'}
    onFocus={onFocus}
    onBlur={onBlur}>
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
  disabled: PropTypes.bool.isRequired,
}

export default SelectionContainer
