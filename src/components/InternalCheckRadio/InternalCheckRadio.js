import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalCheckRadio = (props) => {
  let [hasFocus, setHasFocus] = useState(false)

  let onFocus = () => setHasFocus(true)
  let onBlur = () => setHasFocus(false)
  let type = props.toggle
    ? 'checkbox'
    : props.type || (props.multiple ? 'checkbox' : 'radio')
  let label = props.label || props.title
  let className = props.className + ' ' + (hasFocus ? 'focus' : '')

  return <label className={className} key={props.value}>
    <input
      type={type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      checked={props.checked} />
    <div className="check-radio-display">
      <svg aria-labelledby="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M8.5 12.5L8.5 12.5 5.5 16 0 9.5 3 6 5.5 9 13 0 16 3.5 8.5 12.5Z"/>
      </svg>
    </div>
    {label}</label>
}

InternalCheckRadio.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  ...AppPropTypes.styles,
}

export default InternalCheckRadio
