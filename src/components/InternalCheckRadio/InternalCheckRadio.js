import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalCheckRadio = (props) => {
  let type = props.toggle
    ? 'checkbox'
    : props.type || (props.multiple ? 'checkbox' : 'radio')
  let label = props.label || props.title

  return <label className={props.className} key={props.value}>
    <input
      type={type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      checked={props.checked} />{label}</label>
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
  styles: AppPropTypes.styles.isRequired,
}

export default InternalCheckRadio
