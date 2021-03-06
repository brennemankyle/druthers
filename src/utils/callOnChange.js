import { castArray } from "./utils";

let internalCallOnChange = (props, value) => {
  props.onChange({
    target: {
      value: props.massageDataOut(props, value),
      name: props.name
    }
  });
};

let callOnChange = (props, newValue, method = "add") => {
  // methods: 'add', 'remove', 'replace'
  if (method === "replace")
    return internalCallOnChange(props, castArray(newValue));

  let value = method === "add" ? castArray(newValue) : [];

  if (props.multiple) {
    value = props.selection.map(option => option.value);

    if (method === "add") {
      let newOption = props.options.find(option => option.value === newValue);
      if (newOption != null && newOption.childGroup) {
        // Option has child options, remove selected children
        value = props.selection
          .filter(
            option =>
              !option.group || !option.group.startsWith(newOption.childGroup)
          )
          .map(option => option.value);
      }

      value.push(String(newValue)); // Add
    } else {
      value.splice(value.indexOf(String(newValue)), 1); // Remove
    }
  }

  internalCallOnChange(props, value);
};

export default callOnChange;
