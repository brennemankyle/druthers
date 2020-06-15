import { castArray } from "./utils";
import massageOptions from "./massageOptions";

let massageDataIn = props => {
  let { selection, placeholder, ...otherProps } = props;
  let isEmpty = selection == null || selection === "";

  // Arrayify
  selection = castArray(selection);

  // Massage options
  selection = selection.map(value => String(value));
  let {
    options,
    hierarchicalOptions,
    hasOptions,
    hasOptionGroups
  } = massageOptions(props);

  // Objectify selection, turn single value into label/value object
  let massagedSelection = isEmpty
    ? []
    : selection.map(value => {
        let option = options.find(option => option.value === value);

        return option == null ? { value: value, label: value } : option;
      });

  placeholder = props.text_placeholder ? props.text_placeholder : placeholder;

  return {
    ...otherProps,
    selection: massagedSelection,
    hasSelection: !!massagedSelection.length,
    options,
    hierarchicalOptions,
    hasOptions,
    hasOptionGroups,
    singleNoOptions: !hasOptions && !props.multiple && !!props.creatable,
    text_placeholder: placeholder
  };
};

export default massageDataIn;
