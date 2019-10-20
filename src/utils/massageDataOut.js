let massageDataOut = (props, onChangeValue) => {
  return !props.alwaysReturnArray && !props.multiple ? onChangeValue[0] : onChangeValue
}

export default massageDataOut
