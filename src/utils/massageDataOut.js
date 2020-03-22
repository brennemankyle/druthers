let emptyValue = props => {
  switch (props.parseTo.toLowerCase()) {
    case "number":
    case "int":
    case "float":
    case "boolean":
      return undefined;
    case "string":
    default:
      return "";
  }
};

let massageDataOut = (props, onChangeValue) => {
  if (!onChangeValue.length)
    return !props.alwaysReturnArray && !props.multiple
      ? emptyValue(props)
      : onChangeValue;

  switch (props.parseTo.toLowerCase()) {
    case "number":
    case "int":
      onChangeValue = onChangeValue
        .slice()
        .map(val => parseInt(val, 10))
        .filter(val => !Number.isNaN(val));
      break;
    case "float":
      onChangeValue = onChangeValue
        .slice()
        .map(val => parseFloat(val))
        .filter(val => !Number.isNaN(val));
      break;
    case "boolean":
      onChangeValue = onChangeValue
        .slice()
        .filter(val => ["true", "false"].includes(val.toLowerCase()))
        .map(val => val.toLowerCase() === "true");
      break;
    case "string":
    default:
      break;
  }

  return !props.alwaysReturnArray && !props.multiple
    ? onChangeValue[0]
    : onChangeValue;
};

export default massageDataOut;
