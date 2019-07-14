import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let CheckRadio = (props, ref) => {
  let massagedProps = props.massaged ? props : props.massageData(props)

  let onChange = (e) => {
    let value = String(e.target.value)

    if (massagedProps.multiple) {
      value = massagedProps.selection.map((option) => option.value)
      if (e.target.checked) {
        value.push(String(e.target.value))
      } else {
        value.splice(value.indexOf(String(e.target.value)), 1) // Remove
      }
    }

    massagedProps.onChange({
      target: {
        value: value,
        name: massagedProps.name,
      }
    })
  }

  let type = massagedProps.multiple ? 'checkbox' : 'radio'
  let values = massagedProps.selection.map(item => item.value)
  let Checkable = massagedProps.multiple
    ? massagedProps.components.CheckBox
    : massagedProps.components.Radio

  return <div className={massagedProps.className} style={massagedProps.style} ref={ref}>
    {massagedProps.options.map((option) =>
      <Checkable
        type={type}
        name={massagedProps.name}
        value={option.value}
        onChange={onChange}
        checked={values.includes(option.value)}
        label={option.label}
        title={option.label}
        multiple={massagedProps.multiple}
        styles={massagedProps.styles}
        key={option.value} />)}</div>
}

CheckRadio = forwardRef(CheckRadio)

CheckRadio.defaultProps = {
  hide: false,
  style: {},
}

CheckRadio.propTypes = {
  hide: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  options: AppPropTypes.itemList.isRequired,
  selection: AppPropTypes.itemList.isRequired,
  massageData: PropTypes.func.isRequired,
  massaged: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default CheckRadio
