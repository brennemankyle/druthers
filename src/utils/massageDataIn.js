import { castArray } from "./essentialLodash";

let getKey = (keyGetter, option) =>
  typeof keyGetter === "string" ? option[keyGetter] : keyGetter(option);

let massageDataIn = props => {
  let { selection, options, placeholder, ...otherProps } = props;
  let isEmpty = selection == null || selection === "";

  // Arrayify
  selection = castArray(selection);

  // Stringify
  selection = selection.map(value => String(value));
  let hasOptionGroups = false;
  let strigifyOption = option => {
    let newOption = {};
    let value = getKey(props.valueKey, option);
    let label = getKey(props.labelKey, option);

    if (label != null) newOption["label"] = String(label);
    if (value != null) newOption["value"] = String(value);
    return newOption;
  };
  let massageOptions = (options, groups) => {
    let currentGroup = 0;

    // flatten options
    return [].concat(
      ...options.map(option => {
        let newOption = strigifyOption(option);
        if (groups.length) newOption["group"] = groups.join(".");

        if (getKey(props.optionsKey, option) == null) {
          // No child options
          return newOption;
        } else {
          // has child options
          hasOptionGroups = true;
          let childGroup = [...groups, currentGroup]; // the group for this option's children
          currentGroup = currentGroup + 1;
          newOption["childGroup"] = childGroup.join(".");

          return [
            newOption,
            ...massageOptions(getKey(props.optionsKey, option), childGroup) // Recursion
          ];
        }
      })
    );
  };
  options = massageOptions(options, []);
  // let groups = [0];
  // let massageOption = (option, groups) => {
  //   // Also flatten option groups
  //   if (getKey(props.optionsKey, option) == null) return strigifyOption(option);
  //
  //   hasOptionGroups = true;
  //   let newOption = strigifyOption(option);
  //   let depth = groups.length - 1;
  //   let currentGroup = groups.join(".");
  //   groups[depth] = groups[depth] + 1;
  //
  //   let childGroup = [...groups, 0];
  //
  //   if (newOption.value == null) delete newOption.value;
  //
  //   return [
  //     {
  //       ...newOption,
  //       childGroup: childGroup.join(".")
  //     },
  //     ...getKey(props.optionsKey, option).map(option => {
  //       return {
  //         ...massageOption(option, childGroup),
  //         group: childGroup.join(".")
  //       };
  //     })
  //   ];
  // };
  // options = [].concat(...options.map(option => massageOption(option, groups)));

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
    singleNoOptions: !hasOptions && !props.multiple && !!props.creatable,
    hasOptionGroups,
    text_placeholder: placeholder
  };
};

export default massageDataIn;
