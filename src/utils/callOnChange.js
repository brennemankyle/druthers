let callOnChange = (props, newValue, add = true) => {
  let value = add ? newValue : []

  if (props.multiple) {
    value = props.selection.map((option) => option.value)

    if (add) {
      value.push(String(newValue)) // Add
    } else {
      value.splice(value.indexOf(String(newValue)), 1) // Remove
    }
  }

  props.onChange({
    target: {
      value: props.massageDataOut(value),
      name: props.name,
    }
  })
}

export default callOnChange
