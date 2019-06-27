import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import _last from 'lodash/last'

const ENTER_KEY = 13
const ESCAPE = 27
const BACKSPACE = 8
const DELETE = 46
const ARROW_UP = 38
const ARROW_DOWN = 40
const ARROW_LEFT = 37
const ARROW_RIGHT = 39

let targetValue = (e) => String(e.target.value || e.target.getAttribute('val') || '')

let InternalNewInput = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [placeholder, setPlacholder] = useState(props.placeholder)
  const [optionHighlighted, setOptionHighlighted] = useState()
  const searchRef = useRef(null)

  let hasOptions = !!props.options.length
  let hasSelection = !!props.selection.length
  let filteredOptions = props.filterOptions(searchText, props.selection, props.options)
  let showSelection = props.multiple || !areOptionsOpen // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.selection.length // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)

  if (props.creatable && searchText) {
    filteredOptions.push({value: searchText, label: props.createText + ` "${searchText}"`})
  }

  if (!filteredOptions.map((option) => option.value).includes(optionHighlighted)) {
    let newOptionHighlighted = filteredOptions.length ? filteredOptions[0].value : undefined
    if (newOptionHighlighted !== optionHighlighted) setOptionHighlighted(newOptionHighlighted)
  }

  let callOnChange = (value) => {
    props.onChange({
      target: {
        value: value,
        name: props.name,
      }
    })
  }

  // Events
  let onFocus = (e) => {
    if (!areOptionsOpen) {
      setAreOptionsOpen(true)

      setPlacholder(!props.multiple && props.selection.length
        ? props.selection[0].label // Set placeholder to current selection on single select
        : props.placeholder)

      searchRef.current.focus()
    } else {
      e.target.blur() // Close options
    }
  }
  let onBlur = (e) => {
    if (e.target.classList.contains('search')) {
      setTimeout(() => { // Call blur after focus event
        setAreOptionsOpen(false)
        setSearchText('')
      })
    }
  }
  let onSearchClick = (e) => {
    if (areOptionsOpen) {
      // Close options
      e.preventDefault()
      searchRef.current.blur()
    }
  }
  let onOptionClick = (e) => {
    let value = targetValue(e)

    if (props.multiple) {
      value = props.selection.map((option) => option.value)
      value.push(targetValue(e))
      e.preventDefault() // Keep options open on multi select
    }

    callOnChange(value)
  }
  let onKeyDown = (e) => {
    switch (e.keyCode) {
      case ENTER_KEY:
        if (!areOptionsOpen) {
          setAreOptionsOpen(true)
        } else if (optionHighlighted) {
          onOptionClick({
            target: {
              value: optionHighlighted
            },
            preventDefault: e.preventDefault,
          })
          setOptionHighlighted()
          setSearchText('')

          if (!props.multiple) e.target.blur() // Close options on single select
        }
        break
      case ARROW_UP:
        if (!areOptionsOpen) {
          setAreOptionsOpen(true)
        } else if (filteredOptions.length && optionHighlighted) {
          let index = filteredOptions.map((option) => option.value).indexOf(optionHighlighted) - 1
          if (index >= 0) setOptionHighlighted(filteredOptions[index].value)
        }
        break
      case ARROW_DOWN:
        if (!areOptionsOpen) {
          setAreOptionsOpen(true)
        } else if (filteredOptions.length && optionHighlighted) {
          let index = filteredOptions.map((option) => option.value).indexOf(optionHighlighted) + 1
          if (index < filteredOptions.length) setOptionHighlighted(filteredOptions[index].value)
        }
        break
      case ESCAPE:
        if (areOptionsOpen) setAreOptionsOpen(false)
        setSearchText('')
        break
      case BACKSPACE:
      case DELETE:
        if (!searchText && props.selection.length) {
          let input = document.createElement("input")
          input.value = _last(props.selection).value
          input.classList.add('remove')

          onRemove({
            target: input,
            preventDefault: e.preventDefault,
          })
        }
        break
      default:
        if (!areOptionsOpen) setAreOptionsOpen(true)
        break
    }
  }
  let onRemove = (e) => {
    if (props.removeSelection && e.target.classList.contains('remove')) {
      e.preventDefault() // Prevent click from opening options
      setPlacholder(props.placeholder) // Reset placeholder for single select
      let value = []

      if (props.multiple) {
        value = props.selection.map((option) => option.value)
        value.splice(value.indexOf(targetValue(e)), 1) // Remove
      }

      callOnChange(value)
    }
  }
  let onHoverOption = (e) => {
    let value = targetValue(e)

    if (value && value !== optionHighlighted) {
      setOptionHighlighted(value)
    }
  }

  let {
    HtmlFieldData,
    Container,
    Selection,
    SelectionList,
    OptionList,
    Option,
    Search,
    SelectionContainer,
    NoOptions,
  } = props.components

  return <Container styles={props.styles}>
    <HtmlFieldData
      name={props.name}
      itemList={props.selection}
      key='HtmlFieldData' />

    <SelectionContainer key="SelectionContainer" onFocus={onFocus} onBlur={onBlur} multiple={props.multiple} hasOptions={hasOptions} hasSelection={hasSelection} styles={props.styles} areOptionsOpen={areOptionsOpen}>
      {showSelection && <SelectionList
        itemList={props.selection}
        onClick={onRemove}
        canRemove={true}
        multiple={props.multiple}
        Item={Selection}
        styles={props.styles} />}
      <Search
        hide={!showSearch}
        placeholder={placeholder}
        searchText={searchText}
        onKeyDown={onKeyDown}
        onChange={(e) => setSearchText(targetValue(e))}
        onClick={onSearchClick}
        ref={searchRef}
        styles={props.styles} />
    </SelectionContainer>

    {areOptionsOpen && !!filteredOptions.length && <OptionList
      itemList={filteredOptions}
      multiple={props.multiple}
      onClick={onOptionClick}
      onMouseOver={onHoverOption}
      key='OptionList'
      Item={Option}
      optionHighlighted={optionHighlighted}
      styles={props.styles} />}

    {areOptionsOpen && !filteredOptions.length && <NoOptions styles={props.styles}>{props.noOptionsText}</NoOptions>}</Container>
}

InternalNewInput.propTypes = {
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
  noOptionsText: PropTypes.string.isRequired,
  createText: PropTypes.string.isRequired,
  filterOptions: PropTypes.func,

  components: PropTypes.shape({
    HtmlFieldData: AppPropTypes.element.isRequired,
    Container: AppPropTypes.element.isRequired,
    Selection: AppPropTypes.element.isRequired,
    SelectionList: AppPropTypes.element.isRequired,
    OptionList: AppPropTypes.element.isRequired,
    Option: AppPropTypes.element.isRequired,
    Search: AppPropTypes.element.isRequired,
    SelectionContainer: AppPropTypes.element.isRequired,
    NoOptions: AppPropTypes.element.isRequired,
  }).isRequired,

  styles: AppPropTypes.styles.isRequired,
}

export default InternalNewInput
