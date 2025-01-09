import { castArray } from "./utils";
import massageOptions, { MassageOptionProps } from "./massageOptions";
import {
  MassagedSelectProps,
  Item,
  RawSelectPropsWithoutStyles,
} from "./SelectTypes";
import initDefaultProps from "./defaultProps";

// The raw props massageDataIn needs
export interface MassageDataInProps
  extends MassageOptionProps,
    Required<
      Pick<
        RawSelectPropsWithoutStyles,
        | "multiple"
        | "creatable"
        | "selection"
        | "placeholder"
        | "text_placeholder"
      >
    > {}

export type MassageDataIn = typeof massageDataIn;

function massageDataIn<T extends MassagedSelectProps>(
  rawProps: Partial<MassageDataInProps>,
  defaultProps: MassagedSelectProps = initDefaultProps
): T {
  const props = {
    ...defaultProps,
    ...rawProps,
  };
  let { selection, placeholder, ...otherProps } = props;
  let isEmpty = selection == null || selection === "";

  // Arrayify
  const arraySelection = castArray(selection as any);

  // Massage options
  const itemSelection = arraySelection.map((value) => String(value));
  let { options, hierarchicalOptions, hasOptions, hasOptionGroups } =
    massageOptions(props as MassageOptionProps);

  // Objectify selection, turn single value into label/value object
  let massagedSelection: Item[] = isEmpty
    ? []
    : itemSelection.map((value) => {
        let option = options.find((option) => option.value === value);

        return option == null
          ? { value: value, label: value, selectable: true, group: "0" }
          : option;
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
    text_placeholder: placeholder,
    placeholder,
  } as T;
}

export default massageDataIn;
