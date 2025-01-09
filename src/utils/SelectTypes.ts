import {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactElement,
  FocusEventHandler,
} from "react";
import { SelectReducer } from "../reducers/selectReducer";
import { KeyGetter, StringifyRawItem } from "./massageOptions";
import { MassageDataOut } from "./massageDataOut";
import { FilterOptions } from "./filterOptions";
import { MassageDataIn } from "./massageDataIn";
import { StyledComponent } from "@emotion/styled";

export type AnyReactComponent =
  | StyledComponent<any>
  | FunctionComponent<any>
  | ForwardRefExoticComponent<any>;

export interface InputStyles {
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
  styles_colors_text: string;
  styles_colors_primary: string;
  styles_colors_secondary: string;
  styles_colors_highlight: string;
  styles_colors_warning: string;
  styles_colors_warningBold: string;
  styles_colors_disabled: string;
  styles_colors_background: string;
}

interface InternalStyles {
  styles_width: string;
  styles_multiple: boolean;
  styles_disabled: boolean;
  styles_hasSelection: boolean;
  styles_hasOptions: boolean;
  styles_optionHighlighted: string | null;
  styles_selectionHighlighted: string[] | null;
  styles_rightToLeft: boolean;
  styles_optionsAlwaysOpen: boolean;
  styles_searchable: boolean;
}

export type Styles = InputStyles & InternalStyles;

export interface Item
  extends Required<Omit<StringifyRawItem, "options" | "displayElement">> {
  displayElement?: ReactElement;
  group: string;
  childGroup?: string;
}

export interface HierarchicalItem extends Item {
  options?: HierarchicalItem[];
}

export interface RawItem {
  value?: any;
  label?: any;
  displayElement?: AnyReactComponent;
  selectable?: boolean;
  options?: RawItem[];
  [key: string]: string | AnyReactComponent | boolean | RawItem[] | undefined;
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
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  selection?: RawSelection;
  options: RawItem[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  creatable?: boolean;
  removable?: boolean;
  appendToBody?: boolean;
  rightToLeft?: boolean;
  allowDuplicates?: boolean;
  alwaysReturnArray?: boolean;
  optionsAlwaysOpen?: boolean;
  overlayOptions?: boolean;
  searchable?: boolean;
  filterOptions?: FilterOptions;
  massageDataIn?: MassageDataIn;
  massageDataOut?: MassageDataOut;
  selectReducer?: SelectReducer;
  valueKey?: KeyGetter<string>;
  labelKey?: KeyGetter<string>;
  optionsKey?: KeyGetter<RawItem[]>;
  displayElementKey?: KeyGetter<AnyReactComponent>;
  selectableKey?: KeyGetter<boolean>;
  checkRadioMaxCount?: number;
  parseTo?: "string" | "number" | "int" | "float" | "boolean";
  massaged?: boolean;

  text_placeholder?: string;
  text_noOptions?: string;
  text_create?: string;

  component_HtmlFieldData?: AnyReactComponent;
  component_Wrapper?: AnyReactComponent;
  component_Selection?: AnyReactComponent;
  component_SelectionList?: AnyReactComponent;
  component_OptionList?: AnyReactComponent;
  component_Option?: AnyReactComponent;
  component_Search?: AnyReactComponent;
  component_SelectionWrapper?: AnyReactComponent;
  component_OverlayOptionsWrapper?: AnyReactComponent;
  component_InPlaceOptionsWrapper?: AnyReactComponent;
  component_AppendToBodyOptionsWrapper?: AnyReactComponent;
  component_StyledAppendToBodyOptionsWrapper?: AnyReactComponent;

  svg_Checkmark?: AnyReactComponent;
  svg_Remove?: AnyReactComponent;
  svg_Expand?: AnyReactComponent;
}

export interface MassagedSelectPropsWithoutStyles
  extends Required<Omit<RawSelectPropsWithoutStyles, "options" | "selection">> {
  selection: Item[];
  options: Item[];
  hasSelection: boolean;
  hierarchicalOptions: HierarchicalItem[];
  hasOptions: boolean;
  hasOptionGroups: boolean;
  singleNoOptions: boolean;
  text_placeholder: string;
}

export type RawSelectProps = RawSelectPropsWithoutStyles & Partial<InputStyles>;
export type MassagedSelectProps = MassagedSelectPropsWithoutStyles & Styles;
