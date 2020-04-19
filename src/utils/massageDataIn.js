import { castArray } from "./essentialLodash";

let massageDataIn = props => {
  let { selection, options, placeholder, ...otherProps } = props;
  let isEmpty = selection == null || selection === "";

  // Arrayify
  selection = castArray(selection);

  // Stringify
  selection = selection.map(value => String(value));
  let hasOptionGroups = false;
  let strigifyOption = option => ({
    value: String(
      typeof props.valueKey === "string"
        ? option[props.valueKey]
        : props.valueKey(option)
    ),
    label: String(
      typeof props.labelKey === "string"
        ? option[props.labelKey]
        : props.labelKey(option)
    )
  });
  let groupNumber = 1; // Start at 1 because 0 isn't truthy
  options = [].concat(
    ...options.map(option => {
      // Also flatten option groups
      if (option.options == null) return strigifyOption(option);

      hasOptionGroups = true;
      let newOption = strigifyOption(option);
      let group = groupNumber++;
      if (option.value == null) delete newOption.value;

      return [
        {
          ...newOption,
          group: group,
          parent: true
        },
        ...option.options.map(option => ({
          ...strigifyOption(option),
          group: group
        }))
      ];
    })
  );

  // Objectify selection, turn single value into label/value object
  let massagedSelection = isEmpty
    ? []
    : selection.map(value => {
        let option = options.find(option => option.value === value);

        return option == null ? { value: value, label: value } : option;
      });

  // Distinct
  if (!props.allowDuplicates) {
    let values = options.map(option => option.value);
    options = options.filter(
      (option, index) => values.indexOf(option.value) === index
    );
  }

  placeholder = props.text_placeholder ? props.text_placeholder : placeholder;

  let hasOptions = !!options.length;

  return {
    ...otherProps,
    selection: massagedSelection,
    hasSelection: !!massagedSelection.length,
    options,
    hasOptions,
    singleNoOptions: !hasOptions && !props.multiple && props.creatable,
    hasOptionGroups,
    text_placeholder: placeholder
  };
};

export default massageDataIn;
