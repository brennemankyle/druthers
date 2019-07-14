import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalCheckRadio = (props) => {
  let type = props.multiple ? 'checkbox' : 'radio'
  let values = props.selection.map(item => item.value)

  return props.options.map((option) => <label className={props.className} key={option.value}>
    <input type={type} name={props.name} value={option.value} onChange={props.onChange} checked={values.includes(option.value)} />{option.label}</label>)
}

InternalCheckRadio.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  options: AppPropTypes.itemList.isRequired,
  selection: AppPropTypes.itemList.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default InternalCheckRadio
