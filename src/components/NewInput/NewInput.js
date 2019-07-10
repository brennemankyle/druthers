import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import InternalNewInput from '../InternalNewInput/InternalNewInput'
import castArray from 'lodash/castArray'
import defaultProps from '../../utils/defaultProps'

let NewInput = (props) => {
  let {selection, options, placeholder, ...otherProps} = props

  // Stringify
  selection = castArray(selection).map((value) => String(value))
  options = options.map((option) => ({value: String(option[props.optionKeys[0]]), label: String(option[props.optionKeys[1]])}))

  // Objectify
  let massagedSelection = selection.map((value) => {
    let option = options.find((option) => option.value === value)

    return option == null ? {value: value, label: value} : option
  })

  otherProps.text.placeholder = otherProps.text.placeholder ? otherProps.text.placeholder : placeholder

  return <InternalNewInput
    selection={massagedSelection}
    options={options}
    {...otherProps} />
}

NewInput.defaultProps = defaultProps

NewInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selection: PropTypes.oneOfType([
    AppPropTypes.rawValue.isRequired,
    PropTypes.arrayOf(AppPropTypes.rawValue).isRequired,
  ]).isRequired,
  options: AppPropTypes.rawItemList.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,
  removable: PropTypes.bool.isRequired,
  appendToBody: PropTypes.bool.isRequired,
  rightToLeft: PropTypes.bool.isRequired,
  filterOptions: PropTypes.func.isRequired,
  optionKeys: PropTypes.arrayOf(PropTypes.string).isRequired,

  text: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    noOptions: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired,
  }).isRequired,

  components: PropTypes.shape({
    HtmlFieldData: AppPropTypes.element.isRequired,
    Container: AppPropTypes.element.isRequired,
    Selection: AppPropTypes.element.isRequired,
    SelectionList: AppPropTypes.element.isRequired,
    OptionList: AppPropTypes.element.isRequired,
    Option: AppPropTypes.element.isRequired,
    Search: AppPropTypes.element.isRequired,
    SelectionContainer: AppPropTypes.element.isRequired,
    OptionContainer: AppPropTypes.element.isRequired,
    AppendToBodyOptionsContainer: AppPropTypes.element.isRequired,
    StyledAppendToBodyOptionsContainer: AppPropTypes.element.isRequired,
  }).isRequired,

  styles: AppPropTypes.styles.isRequired,
}

export default NewInput
