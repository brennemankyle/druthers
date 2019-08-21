import HtmlFieldData from '../components/HtmlFieldData/HtmlFieldData'
import AppendToBodyOptionsWrapper from '../components/AppendToBodyOptionsWrapper/AppendToBodyOptionsWrapper'
import { Wrapper, Selection, SelectionList, OptionList, Option, Search, SelectionWrapper, OptionWrapper, StyledAppendToBodyOptionsWrapper } from '../components/styledComponents/styledComponents'
import filterOptions from './filterOptions'
import massageData from './massageData'

const noop = () => {}

let defaultProps = {
  onChange: undefined,
  onBlur: noop,
  onFocus: noop,
  name: undefined,
  selection: [],
  options: [],
  placeholder: 'Select...',
  multiple: false,
  disabled: false,
  creatable: false,
  removable: true,
  appendToBody: false,
  rightToLeft: false,
  filterOptions: filterOptions,
  massageData: massageData,
  optionKeys: ['value', 'label'],
  checkRadioMaxCount: 10,

  text_placeholder: '',
  text_noOptions: 'No Options',
  text_create: 'Create',

  components: {
    Select: undefined,
    CheckRadio: undefined,
    CheckBox: undefined,
    Radio: undefined,
    HtmlFieldData,
    Wrapper,
    Selection,
    SelectionList,
    OptionList,
    Option,
    Search,
    SelectionWrapper,
    OptionWrapper,
    AppendToBodyOptionsWrapper,
    StyledAppendToBodyOptionsWrapper,
  },

  styles_fontSize: '1em',
  styles_borderRadius: '.2em',
  styles_paddingTop: '.25em',
  styles_paddingBottom: '.25em',
  styles_paddingLeft: '.25em',
  styles_paddingRight: '.25em',
  styles_selection_paddingTop: '.1em',
  styles_selection_paddingBottom: '.1em',
  styles_selection_paddingLeft: '.2em',
  styles_selection_paddingRight: '.2em',
  styles_selection_margin: '.2em',
  styles_option_paddingTop: '.25em',
  styles_option_paddingBottom: '.25em',
  styles_option_paddingLeft: '.25em',
  styles_option_paddingRight: '.25em',
  styles_checkRadio_borderWidth: '2px',
  styles_checkRadio_marginBetween: '1em',
  styles_checkRadio_labelMargin: '.2em',
  styles_checkRadio_paddingTop: '.2em',
  styles_checkRadio_paddingBottom: '.2em',
  styles_checkRadio_paddingLeft: '.2em',
  styles_checkRadio_paddingRight: '.2em',
  styles_search_width: '10em',
  styles_icon_width: '1em',
  styles_colors_primary: 'black',
  styles_colors_secondary: '#C3C3C3',
  styles_colors_highlight: 'lightblue',
  styles_colors_warning: '#CD5C5C',
  styles_colors_disabled: '#ECECEC',
  styles_colors_background: 'white',
}

export default defaultProps
