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

  let { CheckBox, Radio } = massagedProps.components

  return <div className={massagedProps.className} style={massagedProps.style} ref={ref}>{massagedProps.multiple
    ? <CheckBox name={massagedProps.name} multiple={massagedProps.multiple} options={massagedProps.options} selection={massagedProps.selection} styles={massagedProps.styles} onChange={onChange} />
    : <Radio name={massagedProps.name} multiple={massagedProps.multiple} options={massagedProps.options} selection={massagedProps.selection} styles={massagedProps.styles} onChange={onChange} />}</div>
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
  massageData: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default CheckRadio
