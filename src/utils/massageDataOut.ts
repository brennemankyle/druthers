import { MassagedSelectProps } from "./SelectTypes";

export type MassageDataOut = typeof massageDataOut;

function emptyValue(props: MassagedSelectProps): string | undefined {
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
}

function massageDataOut(
  props: MassagedSelectProps,
  onChangeValue: string[]
): string[] | number[] | boolean[] | string | number | boolean | undefined {
  if (!onChangeValue.length)
    return !props.alwaysReturnArray && !props.multiple
      ? emptyValue(props)
      : onChangeValue;

  let returnValue: string[] | number[] | boolean[];

  switch (props.parseTo.toLowerCase()) {
    case "number":
    case "int":
      returnValue = onChangeValue
        .slice()
        .map((val) => parseInt(val, 10))
        .filter((val) => !Number.isNaN(val));
      break;
    case "float":
      returnValue = onChangeValue
        .slice()
        .map((val) => parseFloat(val))
        .filter((val) => !Number.isNaN(val));
      break;
    case "boolean":
      returnValue = onChangeValue
        .slice()
        .filter((val) => ["true", "false"].includes(val.toLowerCase()))
        .map((val) => val.toLowerCase() === "true");
      break;
    case "string":
    default:
      returnValue = onChangeValue;
      break;
  }

  return !props.alwaysReturnArray && !props.multiple
    ? returnValue[0]
    : returnValue;
}

export default massageDataOut;
