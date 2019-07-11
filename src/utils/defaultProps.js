import HtmlFieldData from '../components/HtmlFieldData/HtmlFieldData'
import AppendToBodyOptionsWrapper from '../components/AppendToBodyOptionsWrapper/AppendToBodyOptionsWrapper'
import { Wrapper, Selection, SelectionList, OptionList, Option, Search, SelectionWrapper, OptionWrapper, StyledAppendToBodyOptionsWrapper } from '../components/styledComponents/styledComponents'
import filterOptions from './filterOptions'

const noop = () => {}

let defaultProps = {
  onBlur: noop,
  onFocus: noop,
  name: '',
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
  optionKeys: ['value', 'label'],
  text: {
    placeholder: '',
    noOptions: 'No Options',
    create: 'Create',
  },

  components: {
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

  styles: {
    colors: {
      primary: 'black',
      secondary: 'lightgray',
      highlight: 'lightblue',
      warning: '#CD5C5C',
      disabled: '#ECECEC',
      background: 'white',
    }
  }
}

export default defaultProps
