let allOptions = (options, funcName, func, outValues = {}) => {
  outValues.hasOptionGroups = false

  return options[funcName]((...args) => {
    let [option, ...otherArgs] = args
    let returnedValue = func(...args)
    if (option != null && option.value == null) delete returnedValue.value

    if (Array.isArray(args[0].options)) {
      outValues.hasOptionGroups = true
      returnedValue.options = allOptions(args[0].options, funcName, func)
    }

    return returnedValue
  })
}

export default allOptions
