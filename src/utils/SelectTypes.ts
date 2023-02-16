import {
  ChangeEventHandler,
  ComponentType,
  MouseEventHandler,
  ReactElement,
} from "react";
import { SelectReducer } from "../reducers/selectReducer";
import { KeyGetter } from "./massageOptions";
import { MassageDataOut } from "./massageDataOut";
import { FilterOptions } from "./filterOptions";
import { MassageDataIn } from "./massageDataIn";

export interface Styles {
  styles_fontSize: string;
  styles_borderRadius: string;
  styles_paddingTop: string;
  styles_paddingBottom: string;
  styles_paddingLeft: string;
  styles_paddingRight: string;
  styles_selection_paddingTop: string;
  styles_selection_paddingBottom: string;
  styles_selection_paddingLeft: string;
  styles_selection_paddingRight: string;
  styles_selection_margin: string;
  styles_option_paddingTop: string;
  styles_option_paddingBottom: string;
  styles_option_paddingLeft: string;
  styles_option_paddingRight: string;
  styles_checkRadio_borderWidth: string;
  styles_checkRadio_marginBetween: string;
  styles_checkRadio_labelMargin: string;
  styles_checkRadio_paddingTop: string;
  styles_checkRadio_paddingBottom: string;
  styles_checkRadio_paddingLeft: string;
  styles_checkRadio_paddingRight: string;
  styles_search_size: string;
  styles_icon_width: string;
  styles_colors_primary: string;
  styles_colors_secondary: string;
  styles_colors_highlight: string;
  styles_colors_warning: string;
  styles_colors_warningBold: string;
  styles_colors_disabled: string;
  styles_colors_background: string;
}

export interface Item {
  value: string;
  label: string;
  displayElement?: ReactElement;
  group: string;
  childGroup?: string;
}

export interface HierarchicalItem {
  value: string;
  label: string;
  displayElement?: ReactElement;
  group: string;
  childGroup?: string;
  options?: HierarchicalItem[];
}

export interface RawItem {
  value?: any;
  label?: any;
  displayElement?: ReactElement;
  options?: RawItem[];
}

export type RawSelection =
  | Array<string | number | boolean>
  | string
  | number
  | boolean
  | null
  | undefined;

export interface RawSelectPropsWithoutStyles {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur: MouseEventHandler<HTMLInputElement>;
  onFocus: MouseEventHandler<HTMLInputElement>;
  name?: string;
  selection: RawSelection;
  options: RawItem[];
  placeholder: string;
  multiple: boolean;
  disabled: boolean;
  creatable: boolean;
  removable: boolean;
  appendToBody: boolean;
  rightToLeft: boolean;
  allowDuplicates: boolean;
  alwaysReturnArray: boolean;
  massaged: boolean;
  filterOptions: FilterOptions;
  massageDataIn: MassageDataIn;
  massageDataOut: MassageDataOut;
  selectReducer: SelectReducer;
  valueKey: KeyGetter<string | undefined>;
  labelKey: KeyGetter<string | undefined>;
  optionsKey: KeyGetter<RawItem[] | undefined>;
  displayElementKey: KeyGetter<ReactElement | undefined>;
  checkRadioMaxCount: number;
  parseTo: "string" | "number" | "int" | "float" | "boolean";

  text_placeholder: string;
  text_noOptions: string;
  text_create: string;

  component_HtmlFieldData: ReactElement;
  component_Wrapper: ReactElement;
  component_Selection: ReactElement;
  component_SelectionList: ReactElement;
  component_OptionList: ReactElement;
  component_Option: ReactElement;
  component_Search: ReactElement;
  component_SelectionWrapper: ReactElement;
  component_OptionsWrapper: ReactElement;
  component_AppendToBodyOptionsWrapper: ReactElement;
  component_StyledAppendToBodyOptionsWrapper: ReactElement;

  svg_Checkmark: ReactElement;
  svg_Remove: ReactElement;
  svg_Expand: ReactElement;
}

export interface MassagedSelectPropsWithoutStyles
  extends Omit<RawSelectPropsWithoutStyles, "options" | "selection"> {
  selection: Item[];
  options: Item[];
  hasSelection: boolean;
  hierarchicalOptions: HierarchicalItem[];
  hasOptions: boolean;
  hasOptionGroups: boolean;
  singleNoOptions: boolean;
  text_placeholder: string;
}

export type RawSelectProps = RawSelectPropsWithoutStyles & Styles;
export type MassagedSelectProps = MassagedSelectPropsWithoutStyles & Styles;
