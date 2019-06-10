import React, { useState } from 'react'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selection from '../Selection/Selection'
import SelectionList from '../SelectionList/SelectionList'
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
    SelectionList,
    Options,
    Option,
    Search,
  } = props.components

  let RenderSearch = <Search
    searchPlaceholder={props.placeholder}
    searchText={searchText}
    onFocus={() => setAreOptionsOpen(true)}
    onBlur={() => setAreOptionsOpen(false)}
    onChange={(e) => setSearchText(e.target.value)}
    key="Search" />

  let MultiSelection = [
    <SelectionList
      selection={props.selection}
      key='SelectionList'
      components={{
        Selection,
      }} />,
    RenderSearch
  ]

  let SingleSelection = areOptionsOpen
    ? RenderSearch
    : <SelectionList
      selection={props.selection}
      key='SelectionList'
      placeholder={props.placeholder}
      onFocus={() => setAreOptionsOpen(true)}
      onBlur={() => setAreOptionsOpen(false)}
      components={{
        Selection,
      }} />

  return [
    // Hidden form field
    <HtmlFieldData
      name={props.name}
      selection={props.selection}
      key='HtmlFieldData' />,

    // Selection
    props.multiple ? MultiSelection : SingleSelection,

    // Options
    areOptionsOpen && !!props.options.length && <Options
      options={props.options}
      multiple={props.multiple}
      searchText={searchText}
      key='Options'
      components={{
        Option,
      }} />,
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
    SelectionList: SelectionList,
    Options: Options,
    Option: Option,
    Search: Search,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selection: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
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
    SelectionList: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
}

export default Takey
