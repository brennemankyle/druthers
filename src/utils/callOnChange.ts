import { castArray } from "./utils";
import { Item, MassagedSelectProps } from "./SelectTypes";
import { ChangeEvent } from "react";

function internalCallOnChange(
  props: MassagedSelectProps,
  value: string[],
  option: Item | undefined = undefined
): void {
  props.onChange({
    target: {
      value: props.massageDataOut(props, value) as string, // html only returns strings, pretend to be one
      name: props.name,
      option,
    } as unknown as HTMLInputElement,
  } as ChangeEvent<HTMLInputElement>);
}

export type CallOnChangeMethod = "add" | "remove" | "replace";

function callOnChange(
  props: MassagedSelectProps,
  newValue: string | string[],
  method: CallOnChangeMethod = "add"
) {
  const item = props.options.find((option) => option.value === newValue);

  if (item && !item.selectable) return;

  if (method === "replace") {
    return internalCallOnChange(props, castArray(newValue), item);
  }

  let value: string[] = method === "add" ? castArray(newValue) : [];

  if (props.multiple) {
    value = props.selection.map((option) => option.value);

    if (method === "add") {
      let newOption = props.options.find((option) => option.value === newValue);
      if (newOption != null && newOption.childGroup) {
        // Option has child options, remove selected children
        value = props.selection
          .filter(
            (option) =>
              !option.group ||
              !option.group.startsWith(newOption?.childGroup ?? "")
          )
          .map((option) => option.value);
      }

      value.push(String(newValue)); // Add
    } else {
      value.splice(value.indexOf(String(newValue)), 1); // Remove
    }
  }

  internalCallOnChange(props, value, item);
}

export default callOnChange;
