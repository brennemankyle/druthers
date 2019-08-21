import React, { useState, useRef } from 'react'
import { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import ReactDOM from 'react-dom'
import _last from 'lodash/last'
import _inRange from 'lodash/inRange'
import { DivRelative } from '../styledComponents/styledComponents'
import withKeys from '../../utils/withKeys'

const ENTER_KEY = 13
const ESCAPE = 27
const SPACE = 32
const BACKSPACE = 8
const DELETE = 46
const ARROW_UP = 38
const ARROW_DOWN = 40
const ARROW_LEFT = 37
const ARROW_RIGHT = 39
const NUM_LETTER_START = 48
const NUM_LETTER_END = 111
const SEMI_COLON = 186
const EQUAL_SIGN = 187
const COMMA = 188
const DASH = 189
const PERIOD = 190
const FORWARD_SLASH = 191
const OPEN_BRACKET = 219
const BACK_SLASH = 220
const CLOSE_BRAKET = 221
const SINGLE_QUOTE = 222

let targetValue = (e) => String(e.target.value || e.target.getAttribute('val') || '')

let Select = (rawProps) => {
  let props = rawProps.massaged ? rawProps : rawProps.massageData(rawProps)
  const selfRef = useRef(null)
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [placeholder, setPlacholder] = useState(props.text_placeholder)
  const [optionHighlighted, setOptionHighlighted] = useState()

  let hasOptions = !!props.options.length
  let hasSelection = !!props.selection.length
  let filteredOptions = props.filterOptions(searchText, props.selection, props.options)
  let showSelection = props.multiple || !areOptionsOpen // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.selection.length // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)
  let styles = {
    styles_width: selfRef && selfRef.current ? selfRef.current.offsetWidth : 0,
    styles_multiple: props.multiple,
    styles_disabled: props.disabled,
    styles_hasSelection: hasSelection,
    styles_hasOptions: hasOptions,
    styles_optionHighlighted: optionHighlighted,
    styles_rightToLeft: props.rightToLeft,
    ...withKeys(props, 'styles_')
  }

  if (props.creatable && searchText && !filteredOptions.some(item => item.value === searchText)) {
    filteredOptions.push({value: searchText, label: props.text_create + ` "${searchText}"`})
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
    setAreOptionsOpen(true)

    setPlacholder(!props.multiple && props.selection.length
      ? props.selection[0].label // Set placeholder to current selection on single select
      : props.text_placeholder)

    props.onFocus(e)
  }
  let onBlur = (e) => {
    setAreOptionsOpen(false)
    setSearchText('')

    props.onBlur(e)
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
  let onRemove = (e) => {
    if (props.removable && e.target.classList.contains('remove')) {
      e.preventDefault() // Prevent click from opening options
      setPlacholder(props.text_placeholder) // Reset placeholder for single select
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
  let onKeyDown = (e) => {
    let openKeys = [ENTER_KEY, ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, SPACE, SEMI_COLON,
      EQUAL_SIGN, COMMA, DASH, PERIOD, FORWARD_SLASH, OPEN_BRACKET, BACK_SLASH, CLOSE_BRAKET, SINGLE_QUOTE]
    if (!areOptionsOpen
      && (_inRange(e.keyCode, NUM_LETTER_START, NUM_LETTER_END) || openKeys.includes(e.keyCode))) setAreOptionsOpen(true)

    switch (e.keyCode) {
      case ENTER_KEY:
        if (areOptionsOpen && optionHighlighted) {
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
        if (areOptionsOpen && filteredOptions.length && optionHighlighted) {
          let index = filteredOptions.map((option) => option.value).indexOf(optionHighlighted) - 1
          if (index >= 0) setOptionHighlighted(filteredOptions[index].value)
        }
        break
      case ARROW_DOWN:
        if (areOptionsOpen && filteredOptions.length && optionHighlighted) {
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
        break
    }
  }

  if (props.disabled) {
    onFocus = onBlur = onOptionClick = onKeyDown = onRemove = onHoverOption = () => {}
  }

  let {
    component_HtmlFieldData: HtmlFieldData,
    component_Wrapper: Wrapper,
    component_Selection: Selection,
    component_SelectionList: SelectionList,
    component_OptionList: OptionList,
    component_Option: Option,
    component_Search: Search,
    component_SelectionWrapper: SelectionWrapper,
    component_OptionWrapper: OptionWrapper,
    component_AppendToBodyOptionsWrapper: AppendToBodyOptionsWrapper,
    component_StyledAppendToBodyOptionsWrapper: StyledAppendToBodyOptionsWrapper,
  } = props

  let optionList = <OptionList
    itemList={filteredOptions}
    onClick={onOptionClick}
    onMouseOver={onHoverOption}
    Item={Option}
    noItemsText={props.text_noOptions}
    {...styles} />

  return <Wrapper {...styles} ref={selfRef}>
    <HtmlFieldData
      name={props.name}
      itemList={props.selection} />

    <SelectionWrapper
      onFocus={onFocus}
      onBlur={onBlur}
      {...styles}
      areOptionsOpen={areOptionsOpen}
      SelectionList={
        showSelection && <SelectionList
          itemList={props.selection}
          onClick={onRemove}
          removable={!props.disabled && props.removable}
          Item={Selection}
          {...styles} />
      }
      Search={
        <Search
          hide={!showSearch}
          placeholder={placeholder}
          searchText={searchText}
          onKeyDown={onKeyDown}
          onChange={(e) => setSearchText(targetValue(e))}
          {...styles} />
      } />

    {!props.appendToBody && areOptionsOpen &&
      <DivRelative><OptionWrapper {...styles}>{optionList}</OptionWrapper></DivRelative>}

    {props.appendToBody && areOptionsOpen && ReactDOM.createPortal(
      <AppendToBodyOptionsWrapper
        {...styles}
        parentRef={selfRef}
        filteredOptions={filteredOptions}
        StyledAppendToBodyOptionsWrapper={StyledAppendToBodyOptionsWrapper}>
      {optionList}</AppendToBodyOptionsWrapper>,
      document.body)}</Wrapper>
}

Select.defaultProps = defaultProps

Select.propTypes = simpleNewInputPropTypes

export default Select
