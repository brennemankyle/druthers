import { castArray } from './essentialLodash'

let massageDataIn = (props) => {
  let { selection, options, placeholder, ...otherProps } = props
  let isEmpty = selection == null || selection === '' 

  // Stringify
  selection = castArray(selection).map((value) => String(value))
  options = options.map((option) => ({value: String(option[props.optionKeys[0]]), label: String(option[props.optionKeys[1]])}))

  // Objectify
  let massagedSelection = isEmpty
    ? []
    : selection.map((value) => {
        let option = options.find((option) => option.value === value)

        return option == null ? {value: value, label: value} : option
      })

  // Distinct
  if (!props.allowDuplicates) {
    let values = options.map(option => option.value)
    options = options.filter((option, index) => values.indexOf(option.value) === index)
  }

  placeholder = otherProps.text_placeholder ? otherProps.text_placeholder : placeholder

  return {
    ...otherProps,
    selection: massagedSelection,
    options,
    text_placeholder: placeholder,
  }
}

export default massageDataIn
