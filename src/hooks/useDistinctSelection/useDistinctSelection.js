import React, { useEffect } from 'react'

let useDistinctSelection = (props,) => {
  useEffect(() => {
    if (!props.allowDuplicates) {
      let selectionValues = props.selection.map(item => item.value)
      let distinctSelection = props.selection.filter((item, index) => selectionValues.indexOf(item.value) === index)

      props.onChange({
        target: {
          value: props.massageDataOut(distinctSelection.map(item => item.value)),
          name: props.name,
        }
      })
    }
  }, [props.allowDuplicates])
}

export default useDistinctSelection
