import React, { useState } from 'react'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selection from '../Selection/Selection'
import Options from '../Options/Options'
import Option from '../Option/Option'
import Search from '../Search/Search'
import PropTypes from 'prop-types'

let Takey = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  let {
    HtmlFieldData,
    Selection,
    Options,
    Option,
    Search,
  } = props.components

  let MultiSelection = [
    <Selection
      selection={props.selection}
      key='Selection' />,
    <Search
      searchPlaceholder={props.placeholder}
      searchText={props.searchText}
      onFocus={() => setAreOptionsOpen(true)}
      onBlur={() => setAreOptionsOpen(false)}
      onChange={(e) => setSearchText(e.target.value)}
      key="search" />
  ]

  let SingleSelection = <Selection
    selection={props.selection}
    placeholder={props.placeholder}
    onFocus={() => setAreOptionsOpen(true)}
    onBlur={() => setAreOptionsOpen(false)}
    key='Selection' />

  let OptionsContainer = [
    !props.multiple && <Search
      searchPlaceholder={props.searchPlaceholder}
      searchText={props.searchText}
      onChange={(e) => setSearchText(e.target.value)}
      key="search" />,
    <Options
      options={props.options}
      multiple={props.multiple}
      searchText={searchText}
      key='Options'
      components={{
        Option,
      }} />
    ]

  return [
    <HtmlFieldData
      name={props.name}
      selection={props.selection}
      key='HtmlFieldData' />,

    // Selection
    props.multiple ? MultiSelection : SingleSelection,

    // Options
    areOptionsOpen && OptionsContainer,
  ]
}

Takey.defaultProps = {
  name: '',
  selection: [],
  options: [],
  placeholder: '',
  multiple: false,
  creatable: false,

  maxSelectionCount: -1,
  minSelectionCount: -1,
  removeSelection: true,
  searchOptions: true,
  searchPlaceholder: '...search',

  components: {
    HtmlFieldData: HtmlFieldData,
    Selection: Selection,
    Options: Options,
    Option: Option,
    Search: Search,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selection: PropTypes.array,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  creatable: PropTypes.bool,

  maxSelectionCount: PropTypes.number,
  minSelectionCount: PropTypes.number,
  removeSelection: PropTypes.bool,
  searchOptions: PropTypes.bool,

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
}

export default Takey
