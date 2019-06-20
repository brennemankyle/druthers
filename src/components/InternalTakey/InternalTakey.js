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
    Container,
  } = props.components

  let onFocus = () => {
    setAreOptionsOpen(true)
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

  let searchProps = {
    placeholder: props.multiple ? props.placeholder : props.searchPlaceholder,
    searchText: searchText,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onChange: (e) => setSearchText(e.target.value),
    ref: searchRef,
    key: "Search",
  }

  let selectionProps = {
    itemList: props.selection,
    key: 'SelectionList',
    onClick: onRemove,
    canRemove: true,
    Item: Selection,
  }

  return [
    // Hidden form field
    <HtmlFieldData
      name={props.name}
      itemList={props.selection}
      key='HtmlFieldData' />,

    // Selection
    props.multiple
      ? <Container key="Container" onFocus={onFocus}>
          <SelectionList {...selectionProps} />
          <Search {...searchProps} /></Container>
      : <Container key="Container" onFocus={onFocus}>
          {!areOptionsOpen && <SelectionList {...selectionProps} />}
          {areOptionsOpen && <Search {...searchProps} />}
          {!areOptionsOpen && !props.selection.length && props.placeholder}</Container>,

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
    Container: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default InternalTakey
