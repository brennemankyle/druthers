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
  let Checkmark = props.svg_Checkmark

  return <label className={className} key={props.value}>
    <input
      type={type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onClick={props.onClick}
      disabled={props.disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      checked={props.checked} />
    <div className="check-radio-display">
      <Checkmark />
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
  onClick: PropTypes.func,
  multiple: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  svg_Checkmark: AppPropTypes.element.isRequired,
  ...AppPropTypes.styles,
}

export default InternalCheckRadio
