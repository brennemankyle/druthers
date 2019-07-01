import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import _last from 'lodash/last'
import _inRange from 'lodash/inRange'

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
let getRect = (current) => {
  if (!current) return {top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0}
  let {top, bottom, left, right, width, height, x, y} = current.getBoundingClientRect()
  x += window.scrollX
  y += window.scrollY
  return {top, bottom, left, right, width, height, x, y}
}

let InternalNewInput = (props) => {
  const selfRef = useRef(null)
  const optionContainerRef = useRef(null)
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [placeholder, setPlacholder] = useState(props.text.placeholder)
  const [optionHighlighted, setOptionHighlighted] = useState()
  const [rect, setRect] = useState(getRect())
  const [optionContainerRect, setOptionContainerRect] = useState(getRect())
  const [placeOptionsAbove, setPlaceOptionsAbove] = useState(false)
  useEffect(() => {
    setRect(getRect(selfRef.current))
    // eslint-disable-next-line
  }, Object.values(getRect(selfRef.current)).concat([searchText, props.selection, props.options]))
  useEffect(() => {
    setOptionContainerRect(getRect(optionContainerRef.current))
    // eslint-disable-next-line
  }, Object.values(getRect(optionContainerRef.current)).concat([searchText, props.selection, props.options]))
  useEffect(() => {
    if (areOptionsOpen) {
      let windowHeight = window.innerHeight + window.scrollY
      let belowDiff = windowHeight - (rect.y + rect.height + optionContainerRef.current.offsetHeight)
      let aboveDiff = rect.y - optionContainerRef.current.offsetHeight
      setPlaceOptionsAbove(belowDiff < 0 && aboveDiff > belowDiff)
    }
  }, [areOptionsOpen, rect, optionContainerRect, searchText, props.selection, props.options])

  let hasOptions = !!props.options.length
  let hasSelection = !!props.selection.length
  let filteredOptions = props.filterOptions(searchText, props.selection, props.options)
  let showSelection = props.multiple || !areOptionsOpen // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.selection.length // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)
  let styles = {
    rect,
    optionContainerRect,
    placeOptionsAbove,
    ...props.styles
  }

  if (props.creatable && searchText) {
    filteredOptions.push({value: searchText, label: props.text.create + ` "${searchText}"`})
  }

  if (!filteredOptions.map((option) => option.value).includes(optionHighlighted)) {
    let newOptionHighlighted = filteredOptions.length ? filteredOptions[0].value : undefined
    if (newOptionHighlighted !== optionHighlighted) setOptionHighlighted(newOptionHighlighted)
  }

  if (placeOptionsAbove) filteredOptions = filteredOptions.reverse()

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
      : props.text.placeholder)
  }
  let onBlur = (e) => {
    setAreOptionsOpen(false)
    setSearchText('')
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
      setPlacholder(props.text.placeholder) // Reset placeholder for single select
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
    HtmlFieldData,
    Container,
    Selection,
    SelectionList,
    OptionList,
    Option,
    Search,
    SelectionContainer,
    OptionContainer,
    NoOptions,
  } = props.components

  return <Container styles={styles} ref={selfRef}>
    <HtmlFieldData
      name={props.name}
      itemList={props.selection} />

    <SelectionContainer
      onFocus={onFocus}
      onBlur={onBlur}
      multiple={props.multiple}
      hasOptions={hasOptions}
      hasSelection={hasSelection}
      styles={styles}
      areOptionsOpen={areOptionsOpen}
      disabled={props.disabled}
      SelectionList={
        showSelection && <SelectionList
          itemList={props.selection}
          onClick={onRemove}
          canRemove={!props.disabled && props.removable}
          multiple={props.multiple}
          Item={Selection}
          styles={styles} />
      }
      Search={
        <Search
          hide={!showSearch}
          placeholder={placeholder}
          searchText={searchText}
          onKeyDown={onKeyDown}
          onChange={(e) => setSearchText(targetValue(e))}
          styles={styles} />
      } />

    {ReactDOM.createPortal(<OptionContainer styles={styles} ref={optionContainerRef}>
      {areOptionsOpen && !!filteredOptions.length && <OptionList
        itemList={filteredOptions}
        multiple={props.multiple}
        onClick={onOptionClick}
        onMouseOver={onHoverOption}
        Item={Option}
        optionHighlighted={optionHighlighted}
        styles={styles} />}

      {areOptionsOpen && !filteredOptions.length && <NoOptions styles={styles}>{props.text.noOptions}</NoOptions>}</OptionContainer>,
      document.body)}</Container>
}

InternalNewInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selection: AppPropTypes.itemList.isRequired,
  options: AppPropTypes.itemList.isRequired,
  multiple: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  creatable: PropTypes.bool.isRequired,
  removable: PropTypes.bool.isRequired,
  appendToBody: PropTypes.bool.isRequired,
  filterOptions: PropTypes.func,

  text: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    noOptions: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired,
  }).isRequired,

  components: PropTypes.shape({
    HtmlFieldData: AppPropTypes.element.isRequired,
    Container: AppPropTypes.element.isRequired,
    Selection: AppPropTypes.element.isRequired,
    SelectionList: AppPropTypes.element.isRequired,
    OptionList: AppPropTypes.element.isRequired,
    Option: AppPropTypes.element.isRequired,
    Search: AppPropTypes.element.isRequired,
    SelectionContainer: AppPropTypes.element.isRequired,
    OptionContainer: AppPropTypes.element.isRequired,
    NoOptions: AppPropTypes.element.isRequired,
  }).isRequired,

  styles: AppPropTypes.styles.isRequired,
}

export default InternalNewInput
