let internalCallOnChange = (props, value) => {
  props.onChange({
    target: {
      value: props.massageDataOut(value),
      name: props.name,
    }
  })
}

let callOnChange = (props, newValue, add = true, replace = false) => {
  if (Array.isArray(newValue) && !newValue.length) {
    internalCallOnChange(props, newValue) // Empty
    return
  }

  let value = add ? [newValue] : []

  if (props.multiple && !replace) {
    value = props.selection.map(option => option.value)

    if (add) {
      value.push(String(newValue)) // Add
    } else {
      value.splice(value.indexOf(String(newValue)), 1) // Remove
    }
  }

  internalCallOnChange(props, value)
}

export default callOnChange
