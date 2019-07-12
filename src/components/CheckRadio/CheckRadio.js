import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Radio = (props) => {
  let massagedProps = props.massaged ? props : props.massageData(props)

  let type = massagedProps.multiple ? 'checkbox' : 'radio'

  return massagedProps.options.map((option) => <label key={option.value}>
    <input type={type} name={massagedProps.name} value={option.value} />{option.label}</label>)
}

Radio.propTypes = {
  multiple: PropTypes.bool.isRequired,
  options: AppPropTypes.itemList.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default Radio
