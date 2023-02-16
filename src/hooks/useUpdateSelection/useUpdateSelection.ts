import React, { useEffect } from "react";
import callOnChange from "../../utils/callOnChange";
import { Item, MassagedSelectProps } from "../../utils/SelectTypes";

function allBooleanValues(options: Item[]): boolean {
  return options.every((option) => ["false", "true"].includes(option.value));
}

function isBooleanSwitch(props: MassagedSelectProps): boolean {
  return (
    (props.options.length === 1 ||
      (props.options.length === 2 && !props.multiple)) &&
    allBooleanValues(props.options)
  );
}

function useUpdateSelection(
  props: MassagedSelectProps,
  isCheckRadio = false
): void {
  let originalSelection = props.selection;
  let selection = props.selection;

  // Make sure selection reacts to prop changes
  useEffect(() => {
    let booleanSwitch = isCheckRadio ? isBooleanSwitch(props) : false;

    if (!props.allowDuplicates) {
      // No duplicates, distinct
      let selectionValues = selection.map((item) => item.value);
      let newSelection = selection.filter(
        (item, index) => selectionValues.indexOf(item.value) === index
      );

      // eslint-disable-next-line
      if (newSelection.length !== selection.length) selection = newSelection;
    }

    if (!props.multiple && selection.length > 1) {
      // Single, only allow one selection
      selection = [selection[0]];
    }

    if (!props.creatable && !booleanSwitch) {
      // Not creatable, only allow selections in the options
      let newSelection = selection.filter((item) =>
        props.options.some((option) => option.value === item.value)
      );

      if (newSelection.length !== selection.length) selection = newSelection;
    }

    if (!selection.length && booleanSwitch) {
      // When changing to true/false switch, it should never be empty
      selection = [{ value: "false" }];
      if (props.options.length === 1 && props.options[0].value === "false") {
        selection = [{ value: "true" }];
      }
    }

    if (originalSelection !== selection) {
      callOnChange(
        props,
        selection.map((item) => item.value),
        "replace"
      );
    }
  }, [props.allowDuplicates, props.multiple, props.creatable, props.options]);

  useEffect(() => {
    callOnChange(
      props,
      selection.map((item) => item.value),
      "replace"
    ); // Always update with different parsing
    // eslint-disable-next-line
  }, [props.parseTo]);
}

export default useUpdateSelection;
export { allBooleanValues, isBooleanSwitch };
