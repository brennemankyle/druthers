import React, { useEffect } from 'react'

let allBooleanValues = (options) => options.every(option => ['false', 'true'].includes(option.value))
let isBooleanSwitch = (props) => (props.options.length === 1 || (props.options.length === 2 && !props.multiple)) && allBooleanValues(props.options)

let useUpdateSelection = (props, isCheckRadio = false) => {
  let originalSelection = props.selection
  let selection = props.selection

  // Make sure selection reacts to prop changes
  useEffect(() => {
    let booleanSwitch = isCheckRadio ? isBooleanSwitch(props) : false

    if (!props.allowDuplicates) {
      // No duplicates, distinct
      let selectionValues = selection.map(item => item.value)
      let newSelection = selection.filter((item, index) => selectionValues.indexOf(item.value) === index)

      if (newSelection.length !== selection.length) selection = newSelection
    }

    if (!props.multiple && selection.length > 1) {
      // Single, only allow one selection
      selection = [selection[0]]
    }

    if (!props.creatable && !booleanSwitch) {
      // Not creatable, only allow selections in the options
      let newSelection = selection.filter(item => props.options.some(option => option.value === item.value))

      if (newSelection.length !== selection.length) selection = newSelection
    }

    if (!selection.length && booleanSwitch) {
      // When changing to true/false switch, it should never be empty
      selection = [{value: 'false'}]
      if (props.options.length === 1 && props.options[0].value === 'false') {
        selection = [{value: 'true'}]
      }
    }

    if (originalSelection !== selection) {
      props.onChange({
        target: {
          value: props.massageDataOut(selection.map(item => item.value)),
          name: props.name,
        }
      })
    }
  }, [props.allowDuplicates, props.multiple, props.creatable, props.options])
}

export default useUpdateSelection
export { allBooleanValues, isBooleanSwitch }
