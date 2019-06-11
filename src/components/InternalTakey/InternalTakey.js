import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'

let InternalTakey = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const searchRef = useRef(null)

  let filteredOptions = props.options

  // TODO move filtering and ording out
  if (searchText) {
    filteredOptions = filteredOptions
      .filter((option) => option.label.includes(searchText) || option.value.includes(searchText))
  }

  if (props.selection.length) {
    filteredOptions = differenceWith(filteredOptions, props.selection, isEqual)
  }

  let {
    HtmlFieldData,
    Selection,
    SelectionList,
    Options,
    Option,
    Search,
  } = props.components

  let onFocus = () => setAreOptionsOpen(true)
  let onFocusSingleSelection = () => {
    onFocus()
    setTimeout(() => searchRef.current.focus()) // useEffect instead of setTimeout?
  }
  let onBlur = () => setAreOptionsOpen(false)
  let onChange = (e) => {
    let value

    if (props.multiple) {
      value = props.selection.map((option) => option.value)
      value.push(String(e.target.value))
      e.target.value = value
    }

    let event = {
      target: {
        value: value || e.target.value,
        name: props.name,
      }
    }

    props.onChange(event)
  }
  let onKeyDown = (e) => {
    if (e.keyCode === 13 && props.creatable) { // Enter Key
      onChange(e)
    }
  }

  let RenderSearch = <Search
    searchPlaceholder={props.placeholder}
    searchText={searchText}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    onChange={(e) => setSearchText(e.target.value)}
    ref={searchRef}
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
      onFocus={onFocusSingleSelection}
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
    areOptionsOpen && !!filteredOptions.length && <Options
      options={filteredOptions}
      multiple={props.multiple}
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
  noOptionsFound: PropTypes.string,

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
    SelectionList: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]).isRequired,
  }).isRequired,
}

export default InternalTakey
