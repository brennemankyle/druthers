let internalCallOnChange = (props, value) => {
  props.onChange({
    target: {
      value: props.massageDataOut(props, value),
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
  let newOption = props.options.find(option => option.value === newValue)

  if (props.multiple && !replace) {
    value = props.selection.map(option => option.value)

    if (add) {
      if (newOption != null && newOption.parent) { // Option is a parent, remove selected children
        value = props.selection.filter(option => option.group !== newOption.group).map(option => option.value)
      }

      value.push(String(newValue)) // Add
    } else {
      value.splice(value.indexOf(String(newValue)), 1) // Remove
    }
  }

  internalCallOnChange(props, value)
}

export default callOnChange
