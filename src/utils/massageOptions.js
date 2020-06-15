let getKey = (keyGetter, option) =>
  typeof keyGetter === "string" ? option[keyGetter] : keyGetter(option);

let flattenOptions = (options, hasOptionGroups) => {
  if (!hasOptionGroups) return options;

  return [].concat(
    ...options.map(option => {
      if (option.options == null) return option;

      return [option, ...flattenOptions(option.options, hasOptionGroups)]; // Recursion
    })
  );
};

let massageOptions = props => {
  let hasOptionGroups = false;

  let strigifyOption = option => {
    let newOption = {};
    let value = getKey(props.valueKey, option);
    let label = getKey(props.labelKey, option);

    if (label != null) newOption["label"] = String(label);
    if (value != null) newOption["value"] = String(value);
    return newOption;
  };

  let internalMassageOptions = (options, groups) => {
    let currentGroup = 0;

    return options.map(option => {
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

        newOption["options"] = internalMassageOptions(
          getKey(props.optionsKey, option),
          childGroup
        ); // Recursion

        return newOption;
      }
    });
  };

  let removeDuplicates = (options, previousValues = []) => {
    options = options.filter(option => {
      if (option.value == null) return true;

      let includes = previousValues.includes(option.value);

      if (includes) {
        if (option.childGroup == null) {
          return false;
        } else {
          delete option.value;
        }
      } else {
        previousValues.push(option.value);
      }

      return true;
    });

    return options.filter(option => {
      if (option.options == null) return true;

      option.options = removeDuplicates(option.options, previousValues); // Recursion

      // Clean up parent
      if (!option.options.length) {
        if (option.value == null) {
          return false;
        }

        delete option.options;
        delete option.childGroup;
      }

      return true;
    });
  };

  let hierarchicalOptions = internalMassageOptions(props.options, []);
  if (!props.allowDuplicates) {
    // Make all options Distinct
    hierarchicalOptions = removeDuplicates(hierarchicalOptions);
    hasOptionGroups = hierarchicalOptions.some(
      option => option.options != null
    );
  }
  let options = flattenOptions(hierarchicalOptions, hasOptionGroups);

  return {
    hasOptions: !!options.length,
    hasOptionGroups,
    options: options,
    hierarchicalOptions: hierarchicalOptions
  };
};

export default massageOptions;
export { flattenOptions };
