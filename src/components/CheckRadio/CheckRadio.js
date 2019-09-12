import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import withKeys from '../../utils/withKeys'
import callOnChange from '../../utils/callOnChange'
import useUpdateSelection from '../../hooks/useUpdateSelection/useUpdateSelection'
import { CheckBox, Radio, Switch } from '../styledComponents/styledComponents'

let CheckRadio = (rawProps, ref) => {
  let props = rawProps.massaged ? rawProps : rawProps.massageDataIn(rawProps)
  useUpdateSelection(props)

  let type = props.multiple ? 'checkbox' : 'radio'
  let values = props.selection.map(item => item.value)
  let useSwitch = props.options.length === 2
    && !props.multiple
    && props.options.map(option => option.value).every(val => ['false', 'true'].includes(val.toLowerCase()))

  let onChange = (e) => {
    let value = useSwitch
      ? String(e.target.checked)
      : String(e.target.value)

    let add = props.multiple ? e.target.checked : true

    callOnChange(props, value, add)
  }

  let options = useSwitch
    ? [props.options.find(option => option.value.toLowerCase() === 'true')] // Only 'true' item
    : props.options

  if (props.disabled) {
    onChange = () => {}
  }

  let Checkable = props.multiple
    ? props.component_CheckBox
    : useSwitch ? props.component_Switch : props.component_Radio

  return <div className={props.className} style={props.style} ref={ref}>
    {options.map(option =>
      <Checkable
        type={type}
        name={props.name}
        value={option.value}
        disabled={props.disabled}
        onChange={onChange}
        checked={values.includes(option.value)}
        label={option.label}
        title={option.label}
        multiple={props.multiple}
        toggle={useSwitch}
        svg_Checkmark={props.svg_Checkmark}
        {...withKeys(props, 'styles_')}
        key={option.value} />)}</div>
}

CheckRadio = forwardRef(CheckRadio)

CheckRadio.defaultProps = {
  ...defaultProps,
  style: {},
  component_CheckBox: CheckBox,
  component_Radio: Radio,
  component_Switch: Switch,
}

CheckRadio.propTypes = {
  style: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
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
  massageDataIn: PropTypes.func.isRequired,
  massaged: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  component_CheckBox: AppPropTypes.element.isRequired,
  component_Radio: AppPropTypes.element.isRequired,
  component_Switch: AppPropTypes.element.isRequired,
  svg_Checkmark: AppPropTypes.element.isRequired,
  ...AppPropTypes.styles,
}

export default CheckRadio
