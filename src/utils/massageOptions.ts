import React, { ReactElement } from "react";
import { RawItem, Item, HierarchicalItem } from "./SelectTypes";

interface Props {
  options: RawItem[];
  allowDuplicates: boolean;
  valueKey: KeyGetter<string | undefined>;
  labelKey: KeyGetter<string | undefined>;
  optionsKey: KeyGetter<RawItem[] | undefined>;
  displayElementKey: KeyGetter<ReactElement | undefined>;
  selectableKey: KeyGetter<boolean | undefined>;
}

interface MassagedOptions {
  options: Item[];
  hierarchicalOptions: HierarchicalItem[];
  hasOptions: boolean;
  hasOptionGroups: boolean;
}

interface StringifyRawItem {
  value?: string;
  label?: string;
  displayElement?: ReactElement;
  selectable?: boolean;
  options?: RawItem[];
}

export type KeyGetter<T> = string | ((item: RawItem) => T);

function getKey<T>(keyGetter: KeyGetter<T>, option: RawItem): T {
  return typeof keyGetter === "string" ? option[keyGetter] : keyGetter(option);
}

function flattenOptions(
  options: HierarchicalItem[],
  hasOptionGroups: boolean
): Item[] {
  if (!hasOptionGroups) return options;

  // concat will flatten child arrays
  return ([] as HierarchicalItem[]).concat(
    ...options.map((option) => {
      if (option.options == null) return option;

      return [option, ...flattenOptions(option.options, hasOptionGroups)]; // Recursion
    })
  );
}

function massageOptions(props: Props): MassagedOptions {
  let hasOptionGroups = false;

  let massageOption = (option: RawItem): StringifyRawItem => {
    let newOption: StringifyRawItem = {};
    let value = getKey(props.valueKey, option);
    let label = getKey(props.labelKey, option);
    let displayElement = getKey(props.displayElementKey, option);
    let selectable = getKey(props.selectableKey, option);

    if (value != null) newOption["value"] = String(value);
    if (label != null) {
      newOption["label"] = String(label);

      // If there is no value found, the label the value
      if (value == null) newOption["value"] = String(label);
    }
    if (displayElement != null) newOption["displayElement"] = displayElement;

    if (selectable != null) {
      newOption["selectable"] = selectable;
    } else if (value == null && getKey(props.optionsKey, option) != null) {
      newOption["selectable"] = false; // should not be selectable if parent doesn't have a value
    } else {
      newOption["selectable"] = true;
    }

    return newOption;
  };

  let internalMassageOptions = (
    options: StringifyRawItem[],
    groups: number[]
  ): HierarchicalItem[] => {
    let currentGroup = 0;

    return options.map((option) => {
      let newOption = massageOption(option);
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
          getKey<RawItem[]>(props.optionsKey, option),
          childGroup
        ); // Recursion

        return newOption;
      }
    });
  };

  let removeDuplicates = (
    options: HierarchicalItem[],
    previousValues: string[] = []
  ): HierarchicalItem[] => {
    options = options.filter((option) => {
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

    return options.filter((option) => {
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
      (option) => option.options != null
    );
  }
  let options = flattenOptions(hierarchicalOptions, hasOptionGroups);

  return {
    hasOptions: !!options.length,
    hasOptionGroups,
    options: options,
    hierarchicalOptions: hierarchicalOptions,
  };
}

export default massageOptions;
export { flattenOptions };
