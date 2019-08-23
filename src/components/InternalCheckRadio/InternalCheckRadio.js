import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import src from "./checkmark.svg"

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
      <img src={props.imgSrc} alt="remove" />
    </div>
    {label}</label>
}

InternalCheckRadio.defaultProps = {
  imgSrc: src,
}

InternalCheckRadio.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  ...AppPropTypes.styles,
}

export default InternalCheckRadio
