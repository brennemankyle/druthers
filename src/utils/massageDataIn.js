import { castArray } from './essentialLodash'
import allOptions from './allOptions'

let massageDataIn = (props) => {
  let { selection, options, placeholder, ...otherProps } = props
  let isEmpty = selection == null || selection === ''
  let allOptionsOut = {hasOptionGroups: null}

  // Arrayify
  selection = castArray(selection)

  // Stringify
  selection = selection.map((value) => String(value))
  options = allOptions(
    options,
    'map',
    option => ({label: String(option[props.optionKeys[1]]), value: String(option[props.optionKeys[0]])}),
    allOptionsOut)

  // Objectify selection, turn single value into label/value object
  let massagedSelection = isEmpty
    ? []
    : selection.map((value) => {
        let option = allOptions(options, 'find', option => option.value === value)

        return option == null ? {value: value, label: value} : option
      })

  // Distinct
  if (!props.allowDuplicates) {
    let values = allOptions(options, 'map', option => option.value).filter(value => value != null)
    options = allOptions(options, 'filter', (option, index) => values.indexOf(option.value) === index) // TODO: Not going to work
  }

  placeholder = otherProps.text_placeholder ? otherProps.text_placeholder : placeholder

  return {
    ...otherProps,
    selection: massagedSelection,
    options,
    text_placeholder: placeholder,
    hasOptionGroups: allOptionsOut.hasOptionGroups,
  }
}

export default massageDataIn
