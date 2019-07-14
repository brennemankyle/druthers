import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'

let CheckRadio = (rawProps, ref) => {
  let props = rawProps.massaged ? rawProps : rawProps.massageData(rawProps)

  let type = props.multiple ? 'checkbox' : 'radio'
  let values = props.selection.map(item => item.value)
  let useSwitch = props.options.length === 2
    && !props.multiple
    && props.options.map(option => option.value).every(val => ['false', 'true'].includes(val.toLowerCase()))

  let onChange = (e) => {
    let value = useSwitch
      ? String(e.target.checked)
      : String(e.target.value)

    if (props.multiple) {
      value = props.selection.map((option) => option.value)
      if (e.target.checked) {
        value.push(String(e.target.value))
      } else {
        value.splice(value.indexOf(String(e.target.value)), 1) // Remove
      }
    }

    props.onChange({
      target: {
        value: value,
        name: props.name,
      }
    })
  }

  let options = useSwitch
    ? [props.options.find(option => option.value.toLowerCase() === 'true')]
    : props.options

  let Checkable = props.multiple
    ? props.components.CheckBox
    : useSwitch ? props.components.Switch : props.components.Radio

  return <div className={props.className} style={props.style} ref={ref}>
    {options.map(option =>
      <Checkable
        type={type}
        name={props.name}
        value={option.value}
        onChange={onChange}
        checked={values.includes(option.value)}
        label={option.label}
        title={option.label}
        multiple={props.multiple}
        toggle={useSwitch}
        styles={props.styles}
        key={option.value} />)}</div>
}

CheckRadio = forwardRef(CheckRadio)

CheckRadio.defaultProps = {
  ...defaultProps,
  hide: false,
  style: {},
}

CheckRadio.propTypes = {
  hide: PropTypes.bool,
  style: PropTypes.object.isRequired,
  multiple: PropTypes.bool.isRequired,
  selection: PropTypes.oneOfType([
    AppPropTypes.rawValue.isRequired,
    PropTypes.arrayOf(AppPropTypes.rawValue).isRequired,
    AppPropTypes.itemList.isRequired,
  ]).isRequired,
  options: PropTypes.oneOfType([
    AppPropTypes.rawItemList.isRequired,
    AppPropTypes.itemList.isRequired,
  ]).isRequired,
  massageData: PropTypes.func.isRequired,
  massaged: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default CheckRadio
