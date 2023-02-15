import { castArray } from "./utils";
import { MassagedSelectProps } from "./SelectTypes";

function internalCallOnChange(
  props: MassagedSelectProps,
  value: string[]
): void {
  props.onChange({
    target: {
      value: props.massageDataOut(props, value) as string, // html only returns strings, pretend to be one
      name: props.name,
    },
  });
}

function callOnChange(
  props: MassagedSelectProps,
  newValue: string[] | string,
  method = "add"
) {
  // methods: 'add', 'remove', 'replace'
  if (method === "replace")
    return internalCallOnChange(props, castArray(newValue));

  let value: (string | undefined)[] =
    method === "add" ? castArray(newValue) : [];

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

  internalCallOnChange(props, value);
}

export default callOnChange;
