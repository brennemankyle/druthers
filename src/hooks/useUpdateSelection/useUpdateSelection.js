import React, { useEffect } from 'react'

let useUpdateSelection = (props,) => {
  let originalSelection = props.selection
  let selection = props.selection

  useEffect(() => {
    if (!props.allowDuplicates) {
      let selectionValues = selection.map(item => item.value)
      selection = selection.filter((item, index) => selectionValues.indexOf(item.value) === index) // Distinct
    }

    if (!props.multiple && selection.length > 1) {
      selection = [selection[0]]
    }

    if (originalSelection !== selection) {
      props.onChange({
        target: {
          value: props.massageDataOut(selection.map(item => item.value)),
          name: props.name,
        }
      })
    }
  }, [props.allowDuplicates, props.multiple])
}

export default useUpdateSelection
