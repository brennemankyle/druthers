import { castArray } from "./utils";
import massageOptions from "./massageOptions";
import { RawSelection, MassagedSelectProps, RawItem } from "./SelectTypes";
import { KeyGetter } from "./massageOptions";

// The raw props massageDataIn needs
interface Props {
  allowDuplicates: boolean;
  multiple: boolean;
  creatable: boolean;
  selection: RawSelection;
  options: RawItem[];
  placeholder: string;
  text_placeholder: string;
  valueKey: KeyGetter<string | undefined>;
  labelKey: KeyGetter<string | undefined>;
  optionsKey: KeyGetter<RawItem[] | undefined>;
}

export type MassageDataIn = typeof massageDataIn;

function massageDataIn(props: Props) {
  let { selection, placeholder, ...otherProps } = props;
  let isEmpty = selection == null || selection === "";

  // Arrayify
  const arraySelection = castArray(selection);

  // Massage options
  const itemSelection = arraySelection.map((value) => String(value));
  let { options, hierarchicalOptions, hasOptions, hasOptionGroups } =
    massageOptions(props);

  // Objectify selection, turn single value into label/value object
  let massagedSelection = isEmpty
    ? []
    : itemSelection.map((value) => {
        let option = options.find((option) => option.value === value);

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
    text_placeholder: placeholder,
  };
}

export default massageDataIn;
