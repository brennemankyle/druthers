import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalCheckRadio = (props) => {
  let type = props.type || props.multiple ? 'checkbox' : 'radio'
  let label = props.label || props.title

  return <label className={props.className} key={props.value}>
    <input type={type} name={props.name} value={props.value} onChange={props.onChange} checked={props.checked} />{label}</label>
}

InternalCheckRadio.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  styles: AppPropTypes.styles.isRequired,
}

export default InternalCheckRadio
