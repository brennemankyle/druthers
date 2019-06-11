import React, { useState } from 'react'
import PropTypes from 'prop-types'

let InternalTakey = (props) => {
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

  let onFocus = () => setAreOptionsOpen(true)
  let onBlur = () => setAreOptionsOpen(false)
  let onChange = (e) => {
    debugger
    return props.onChange(e)
  }

  let RenderSearch = <Search
    searchPlaceholder={props.placeholder}
    searchText={searchText}
    onFocus={onFocus}
    onBlur={onBlur}
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
      onFocus={onFocus}
      onBlur={onBlur}
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
      onClick={onChange}
      key='Options'
      components={{
        Option,
      }} />,
  ]
}

InternalTakey.propTypes = {
  name: PropTypes.string.isRequired,
  selection: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,

  maxSelectionCount: PropTypes.number.isRequired,
  minSelectionCount: PropTypes.number.isRequired,
  removeSelection: PropTypes.bool,
  searchOptions: PropTypes.bool,

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    SelectionList: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default InternalTakey
