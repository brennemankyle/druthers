import React, { useEffect } from 'react'

let useUpdateSelection = (props,) => {
  let originalSelection = props.selection
  let selection = props.selection

  useEffect(() => {
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

    if (!props.creatable) {
      // Not creatable, only allow selections in the options
      let newSelection = selection.filter(item => props.options.some(option => option.value === item.value))

      if (newSelection.length !== selection.length) selection = newSelection
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
