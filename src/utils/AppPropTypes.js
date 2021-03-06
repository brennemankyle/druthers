import PropTypes from "prop-types";

let item = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  group: PropTypes.string,
  childGroup: PropTypes.string
});

let rawItem = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired
    })
  )
});

let AppPropTypes = {
  item: item,
  itemList: PropTypes.arrayOf(item),
  element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.element })
  ]),
  rawValue: PropTypes.any.isRequired,
  rawItem: rawItem,
  rawItemList: PropTypes.arrayOf(rawItem),
  styles: {
    styles_fontSize: PropTypes.string.isRequired,
    styles_borderRadius: PropTypes.string.isRequired,
    styles_paddingTop: PropTypes.string.isRequired,
    styles_paddingBottom: PropTypes.string.isRequired,
    styles_paddingLeft: PropTypes.string.isRequired,
    styles_paddingRight: PropTypes.string.isRequired,
    styles_selection_paddingTop: PropTypes.string.isRequired,
    styles_selection_paddingBottom: PropTypes.string.isRequired,
    styles_selection_paddingLeft: PropTypes.string.isRequired,
    styles_selection_paddingRight: PropTypes.string.isRequired,
    styles_selection_margin: PropTypes.string.isRequired,
    styles_option_paddingTop: PropTypes.string.isRequired,
    styles_option_paddingBottom: PropTypes.string.isRequired,
    styles_option_paddingLeft: PropTypes.string.isRequired,
    styles_option_paddingRight: PropTypes.string.isRequired,
    styles_checkRadio_borderWidth: PropTypes.string.isRequired,
    styles_checkRadio_marginBetween: PropTypes.string.isRequired,
    styles_checkRadio_labelMargin: PropTypes.string.isRequired,
    styles_checkRadio_paddingTop: PropTypes.string.isRequired,
    styles_checkRadio_paddingBottom: PropTypes.string.isRequired,
    styles_checkRadio_paddingLeft: PropTypes.string.isRequired,
    styles_checkRadio_paddingRight: PropTypes.string.isRequired,
    styles_search_size: PropTypes.string.isRequired,
    styles_icon_width: PropTypes.string.isRequired,
    styles_colors_primary: PropTypes.string.isRequired,
    styles_colors_secondary: PropTypes.string.isRequired,
    styles_colors_highlight: PropTypes.string.isRequired,
    styles_colors_warning: PropTypes.string.isRequired,
    styles_colors_warningBold: PropTypes.string.isRequired,
    styles_colors_disabled: PropTypes.string.isRequired,
    styles_colors_background: PropTypes.string.isRequired
  }
};

let selectPropsTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  name: PropTypes.string,
  selection: PropTypes.oneOfType([
    PropTypes.any.isRequired,
    PropTypes.arrayOf(PropTypes.any).isRequired,
    AppPropTypes.itemList.isRequired
  ]).isRequired,
  options: PropTypes.oneOfType([
    AppPropTypes.rawItemList.isRequired,
    AppPropTypes.itemList.isRequired
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,
  removable: PropTypes.bool.isRequired,
  appendToBody: PropTypes.bool.isRequired,
  rightToLeft: PropTypes.bool.isRequired,
  allowDuplicates: PropTypes.bool.isRequired,
  alwaysReturnArray: PropTypes.bool.isRequired,
  filterOptions: PropTypes.func.isRequired,
  massageDataIn: PropTypes.func.isRequired,
  massageDataOut: PropTypes.func.isRequired,
  selectReducer: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  labelKey: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  optionsKey: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  checkRadioMaxCount: PropTypes.number.isRequired,
  parseTo: PropTypes.oneOf(["string", "number", "int", "float", "boolean"]),

  text_placeholder: PropTypes.string.isRequired,
  text_noOptions: PropTypes.string.isRequired,
  text_create: PropTypes.string.isRequired,

  component_HtmlFieldData: AppPropTypes.element.isRequired,
  component_Wrapper: AppPropTypes.element.isRequired,
  component_Selection: AppPropTypes.element.isRequired,
  component_SelectionList: AppPropTypes.element.isRequired,
  component_OptionList: AppPropTypes.element.isRequired,
  component_Option: AppPropTypes.element.isRequired,
  component_Search: AppPropTypes.element.isRequired,
  component_SelectionWrapper: AppPropTypes.element.isRequired,
  component_OptionsWrapper: AppPropTypes.element.isRequired,
  component_AppendToBodyOptionsWrapper: AppPropTypes.element.isRequired,
  component_StyledAppendToBodyOptionsWrapper: AppPropTypes.element.isRequired,

  svg_Checkmark: AppPropTypes.element.isRequired,
  svg_Remove: AppPropTypes.element.isRequired,
  svg_Expand: AppPropTypes.element.isRequired,

  ...AppPropTypes.styles
};

export { selectPropsTypes };
export default AppPropTypes;
