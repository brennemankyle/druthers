import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalTakey = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const searchRef = useRef(null)

  let filteredOptions = props.filterOptions(searchText, props.selection, props.options)

  let {
    HtmlFieldData,
    Selection,
    SelectionList,
    OptionList,
    Option,
    Search,
  } = props.components

  let onFocus = () => setAreOptionsOpen(true)
  let onFocusSingleSelection = () => {
    onFocus()
    setTimeout(() => searchRef.current.focus()) // useEffect instead of setTimeout?
  }
  let onBlur = (e) => {
    setAreOptionsOpen(false)
  }
  let onOptionClick = (e) => {
    let value = e.target.value

    if (props.multiple) {
      value = props.selection.map((option) => option.value)
      value.push(String(e.target.value))
      e.preventDefault()
    }

    let event = {
      target: {
        value: value,
        name: props.name,
      }
    }

    props.onChange(event)
  }
  let onKeyDown = (e) => {
    if (e.keyCode === 13 && props.creatable) { // Enter Key
      onOptionClick(e)
      setSearchText('')

      if (!props.multiple) {
        e.target.blur()
      }
    }
  }
  let onRemove = (e) => {
    if (props.removeSelection && e.target.classList.contains('remove')) {
      let value = []

      if (props.multiple) {
        value = props.selection.map((option) => option.value)
        value.splice(value.indexOf(String(e.target.value)), 1)
      }

      let event = {
        target: {
          value: value,
          name: props.name,
        }
      }

      props.onChange(event)
    }
  }

  let placeholder = props.multiple ? props.placeholder : props.searchPlaceholder

  let RenderSearch = <Search
    placeholder={placeholder}
    searchText={searchText}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    onChange={(e) => setSearchText(e.target.value)}
    ref={searchRef}
    key="Search" />

  let MultiSelection = [
    <SelectionList
      itemList={props.selection}
      key='SelectionList'
      onClick={onRemove}
      canRemove={true}
      Item={Selection} />,
    RenderSearch
  ]

  let SingleSelection = areOptionsOpen
    ? RenderSearch
    : <SelectionList
      itemList={props.selection}
      key='SelectionList'
      placeholder={props.placeholder}
      onFocus={onFocusSingleSelection}
      onBlur={onBlur}
      onClick={onRemove}
      canRemove={true}
      Item={Selection} />

  return [
    // Hidden form field
    <HtmlFieldData
      name={props.name}
      selection={props.selection}
      key='HtmlFieldData' />,

    // Selection
    props.multiple ? MultiSelection : SingleSelection,

    // OptionList
    areOptionsOpen && !!filteredOptions.length && <OptionList
      itemList={filteredOptions}
      multiple={props.multiple}
      onClick={onOptionClick}
      key='OptionList'
      Item={Option} />,
  ]
}

InternalTakey.propTypes = {
  name: PropTypes.string.isRequired,
  selection: AppPropTypes.itemList.isRequired,
  options: AppPropTypes.itemList.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,

  maxSelectionCount: PropTypes.number.isRequired,
  minSelectionCount: PropTypes.number.isRequired,
  removeSelection: PropTypes.bool,
  searchOptions: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  noOptionsFound: PropTypes.string,
  filterOptions: PropTypes.func,

  components: PropTypes.shape({
    HtmlFieldData: AppPropTypes.element.isRequired,
    Selection: AppPropTypes.element.isRequired,
    SelectionList: AppPropTypes.element.isRequired,
    OptionList: AppPropTypes.element.isRequired,
    Option: AppPropTypes.element.isRequired,
    Search: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default InternalTakey
