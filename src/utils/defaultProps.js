import HtmlFieldData from '../components/HtmlFieldData/HtmlFieldData'
import AppendToBodyOptionsContainer from '../components/AppendToBodyOptionsContainer/AppendToBodyOptionsContainer'
import { Container, Selection, SelectionList, OptionList, Option, Search, SelectionContainer, OptionContainer, StyledAppendToBodyOptionsContainer } from '../components/styledComponents/styledComponents'
import filterOptions from './filterOptions'

let defaultProps = {
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
    Container,
    Selection,
    SelectionList,
    OptionList,
    Option,
    Search,
    SelectionContainer,
    OptionContainer,
    AppendToBodyOptionsContainer,
    StyledAppendToBodyOptionsContainer,
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
