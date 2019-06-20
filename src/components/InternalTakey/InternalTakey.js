import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let InternalTakey = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [placeholder, setPlacholder] = useState(props.placeholder)
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

    setPlacholder(!props.multiple && props.selection.length
      ? props.selection[0].label
      : props.placeholder)

    setTimeout(() => searchRef.current.focus()) // useEffect instead of setTimeout?
  }
  let onBlur = (e) => {
    setAreOptionsOpen(false)
    setSearchText('')
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
      e.preventDefault()
      setPlacholder(props.placeholder)
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

  let showSelection = props.multiple || !areOptionsOpen // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.selection.length // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)

  return [
    // Hidden form field
    <HtmlFieldData
      name={props.name}
      itemList={props.selection}
      key='HtmlFieldData' />,

    // Selection
    <Container key="Container" onFocus={onFocus}>
      {showSelection && <SelectionList
        itemList={props.selection}
        onClick={onRemove}
        canRemove={true}
        Item={Selection} />}
      {showSearch && <Search
        placeholder={placeholder}
        searchText={searchText}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={(e) => setSearchText(e.target.value)}
        ref={searchRef} />}
    </Container>,

    // OptionList
    areOptionsOpen && <OptionList
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
