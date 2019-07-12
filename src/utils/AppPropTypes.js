import PropTypes from 'prop-types'

let item = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

let rawValue = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.bool.isRequired,
  PropTypes.number.isRequired
])

let rawItem = PropTypes.shape({
  value: rawValue.isRequired,
  label: rawValue.isRequired,
})

let AppPropTypes = {
  item: item,
  itemList: PropTypes.arrayOf(item),
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
  rawValue: rawValue,
  rawItem: rawItem,
  rawItemList: PropTypes.arrayOf(rawItem),
  styles: PropTypes.shape({
    fontSize: PropTypes.string.isRequired,
    borderRadius: PropTypes.string.isRequired,
    paddingTop: PropTypes.string.isRequired,
    paddingBottom: PropTypes.string.isRequired,
    paddingLeft: PropTypes.string.isRequired,
    paddingRight: PropTypes.string.isRequired,
    selection: PropTypes.shape({
      paddingTop: PropTypes.string.isRequired,
      paddingBottom: PropTypes.string.isRequired,
      paddingLeft: PropTypes.string.isRequired,
      paddingRight: PropTypes.string.isRequired,
    }).isRequired,
    option: PropTypes.shape({
      paddingTop: PropTypes.string.isRequired,
      paddingBottom: PropTypes.string.isRequired,
      paddingLeft: PropTypes.string.isRequired,
      paddingRight: PropTypes.string.isRequired,
    }).isRequired,
    search: PropTypes.shape({
      width: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.shape({
      width: PropTypes.string.isRequired,
    }).isRequired,
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      warning: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
    }).isRequired,
  })
}

let simpleNewInputPropTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selection: PropTypes.oneOfType([
    AppPropTypes.rawValue.isRequired,
    PropTypes.arrayOf(AppPropTypes.rawValue).isRequired,
    AppPropTypes.itemList.isRequired,
  ]).isRequired,
  options: PropTypes.oneOfType([
    AppPropTypes.rawItemList.isRequired,
    AppPropTypes.itemList.isRequired,
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,
  removable: PropTypes.bool.isRequired,
  appendToBody: PropTypes.bool.isRequired,
  rightToLeft: PropTypes.bool.isRequired,
  filterOptions: PropTypes.func.isRequired,
  massageData: PropTypes.func.isRequired,
  optionKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkRadioMaxCount: PropTypes.number.isRequired,

  text: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    noOptions: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired,
  }).isRequired,

  components: PropTypes.shape({
    InternalNewInput: AppPropTypes.element.isRequired,
    CheckRadio: AppPropTypes.element.isRequired,
    DivHidden: AppPropTypes.element.isRequired,
    HtmlFieldData: AppPropTypes.element.isRequired,
    Wrapper: AppPropTypes.element.isRequired,
    Selection: AppPropTypes.element.isRequired,
    SelectionList: AppPropTypes.element.isRequired,
    OptionList: AppPropTypes.element.isRequired,
    Option: AppPropTypes.element.isRequired,
    Search: AppPropTypes.element.isRequired,
    SelectionWrapper: AppPropTypes.element.isRequired,
    OptionWrapper: AppPropTypes.element.isRequired,
    AppendToBodyOptionsWrapper: AppPropTypes.element.isRequired,
    StyledAppendToBodyOptionsWrapper: AppPropTypes.element.isRequired,
  }).isRequired,

  styles: AppPropTypes.styles.isRequired,
}

export { simpleNewInputPropTypes }
export default AppPropTypes
