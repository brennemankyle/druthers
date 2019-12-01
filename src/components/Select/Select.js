import React, { useState, useRef, useEffect } from 'react'
import { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import moveHighlighted from '../../utils/moveHighlighted'
import { last, inRange } from '../../utils/essentialLodash'
import ReactDOM from 'react-dom'
import { DivRelative } from '../styledComponents/styledComponents'
import withKeys from '../../utils/withKeys'
import callOnChange from '../../utils/callOnChange'
import useUpdateSelection from '../../hooks/useUpdateSelection/useUpdateSelection'
import { ENTER_KEY, ESCAPE, SPACE, BACKSPACE, DELETE, ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, NUM_LETTER_START, NUM_LETTER_END, SEMI_COLON, EQUAL_SIGN, COMMA, DASH, PERIOD, FORWARD_SLASH, OPEN_BRACKET, BACK_SLASH, CLOSE_BRAKET, SINGLE_QUOTE, TAB } from '../../utils/keyCodes'

let targetHasValue = e => e.target.hasAttribute('value') || e.target.hasAttribute('val')
let targetValue = e => String(e.target.value || e.target.getAttribute('val') || '')

let Select = (rawProps) => {
  let props = rawProps.massaged ? rawProps : rawProps.massageDataIn(rawProps)
  const selfRef = useRef(null)
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [placeholder, setPlacholder] = useState(props.text_placeholder)
  const [optionHighlighted, setOptionHighlighted] = useState()
  const [selectionHighlighted, setSelectionHighlighted] = useState()
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (areOptionsOpen) setWidth(selfRef && selfRef.current ? selfRef.current.offsetWidth : 0)
  }, [areOptionsOpen]) // When options open make sure width is correct
  useEffect(() => {
    setOptionHighlighted()
    setSelectionHighlighted()
  }, [searchText]) // If search text changes remove highlight
  useUpdateSelection(props) // Update selection based on prop changes

  let hasOptions = !!props.options.length
  let hasSelection = !!props.selection.length
  let singleNoOptions = !hasOptions && !props.multiple && props.creatable
  let filteredOptions = props.filterOptions(props, searchText)
  let showSelection = props.multiple || !areOptionsOpen // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.selection.length // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)
  let styles = {
    styles_width: width,
    styles_multiple: props.multiple,
    styles_disabled: props.disabled,
    styles_hasSelection: hasSelection,
    styles_hasOptions: hasOptions,
    styles_optionHighlighted: optionHighlighted,
    styles_selectionHighlighted: selectionHighlighted,
    styles_rightToLeft: props.rightToLeft,
    ...withKeys(props, 'styles_')
  }

  let newWidth = selfRef && selfRef.current ? selfRef.current.offsetWidth : 0
  if (width !== newWidth) setWidth(newWidth) // Make sure width is updated correctly

  if (!hasOptions && !props.creatable) {
    console.error('Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable')
  }

  if (props.creatable && searchText && !filteredOptions.some(option => option.value === searchText)
    && (props.allowDuplicates || !props.selection.some(item => item.value === searchText))) // Don't allow duplicates
  {
    filteredOptions.push({value: searchText, label: props.text_create + ` "${searchText}"`}) // Add option for creatable
  }

  if (selectionHighlighted == null && !filteredOptions.map(option => option.value).filter(value => value != null).includes(optionHighlighted)) {
    let newOptionHighlighted = moveHighlighted(filteredOptions, 0, optionHighlighted)
    if (newOptionHighlighted !== optionHighlighted) setOptionHighlighted(newOptionHighlighted)
  }

  let newPlaceholder = areOptionsOpen && !props.multiple && props.selection.length
    ? props.selection[0].label // Set placeholder to current selection on single select
    : props.text_placeholder
  if (!singleNoOptions && newPlaceholder !== placeholder) setPlacholder(newPlaceholder)
  if (singleNoOptions && !areOptionsOpen && props.selection.length && searchText === '') setSearchText(props.selection[0].label) // On single creatable with no options, edit the currently selected label

  // Events
  let onFocus = (e) => {
    setAreOptionsOpen(true)

    props.onFocus(e)
  }
  let onBlur = (e) => {
    if (singleNoOptions) {
      callOnChange(props, targetValue(e)) // Make single no options behave like text input
    }

    setAreOptionsOpen(false)
    setSearchText('')
    setSelectionHighlighted()

    props.onBlur(e)
  }
  let onOptionClick = (e) => {
    e.preventDefault()
    if (!targetHasValue(e)) return // no value, do nothing

    if (!props.multiple) {
      document.activeElement.blur() // Close options on single select
    }

    callOnChange(props, targetValue(e))
  }
  let onRemove = (e) => {
    if (props.removable && e.target.classList.contains('remove')) {
      callOnChange(props, targetValue(e), 'remove')
      setSearchText('')
    }
  }
  let onHoverOption = (e) => {
    let value = targetValue(e)

    if (value && value !== optionHighlighted) {
      setOptionHighlighted(value)
      setSelectionHighlighted()
    }
  }
  let onHoverSelection = (e) => {
    if (!e.target.classList.contains('remove')) return

    let value = targetValue(e)

    if (value && value !== optionHighlighted) {
      setOptionHighlighted()
      setSelectionHighlighted(value)
    }
  }
  let onSelectionOut = (e) => {
    if (!areOptionsOpen) setSelectionHighlighted() // Stop highlighting selection if mouse leaves select area
  }
  let onKeyDown = (e) => {
    let openKeys = [ENTER_KEY, ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, SPACE, SEMI_COLON,
      EQUAL_SIGN, COMMA, DASH, PERIOD, FORWARD_SLASH, OPEN_BRACKET, BACK_SLASH, CLOSE_BRAKET, SINGLE_QUOTE]
    if (!areOptionsOpen
      && (inRange(e.keyCode, NUM_LETTER_START, NUM_LETTER_END) || openKeys.includes(e.keyCode))) setAreOptionsOpen(true) // if you type letters, numbers, or openKeys then open options

    switch (e.keyCode) {
      case TAB:
      case ENTER_KEY:
        if (areOptionsOpen && optionHighlighted != null) {
          onOptionClick({
            target: {
              value: optionHighlighted,
              hasAttribute: () => true,
            },
            preventDefault: e.preventDefault,
          })
          setOptionHighlighted(moveHighlighted(filteredOptions, 1, optionHighlighted)) // Highlight next option
          setSelectionHighlighted()
          setSearchText('')

          if (!props.multiple) e.target.blur() // Close options on single select
        }
        break
      case ARROW_UP:
        if (areOptionsOpen && filteredOptions.length) {
          setOptionHighlighted(moveHighlighted(filteredOptions, -1, optionHighlighted))
          setSelectionHighlighted()
        }
        break
      case ARROW_DOWN:
        if (areOptionsOpen && filteredOptions.length) {
          setOptionHighlighted(moveHighlighted(filteredOptions, 1, optionHighlighted))
          setSelectionHighlighted()
        }
        break
      case ARROW_LEFT:
        if (props.selection.length && searchText === '') {
          setSelectionHighlighted(moveHighlighted(props.selection, -1, selectionHighlighted, true))
          setOptionHighlighted()
        }
        break
      case ARROW_RIGHT:
        if (props.selection.length && searchText === '') {
          setSelectionHighlighted(moveHighlighted(props.selection, 1, selectionHighlighted, true))
          setOptionHighlighted()
        }
        break
      case ESCAPE:
        if (areOptionsOpen) setAreOptionsOpen(false)
        setSearchText('')
        setOptionHighlighted()
        setSelectionHighlighted()
        break
      case BACKSPACE:
      case DELETE:
        if (!searchText && props.selection.length) { // Only remove if there isn't search text
          let input = document.createElement("input")
          input.value = last(props.selection).value
          input.classList.add('remove')

          if (selectionHighlighted != null) {
            input.value = selectionHighlighted
            setSelectionHighlighted(moveHighlighted(props.selection, -1, selectionHighlighted, true))
            setOptionHighlighted()
          }

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
    component_OptionsWrapper: OptionsWrapper,
    component_AppendToBodyOptionsWrapper: AppendToBodyOptionsWrapper,
    component_StyledAppendToBodyOptionsWrapper: StyledAppendToBodyOptionsWrapper,
  } = props

  let optionList = <OptionList
    itemList={filteredOptions}
    onClick={onOptionClick}
    onMouseOver={onHoverOption}
    Item={Option}
    noItemsText={hasOptions ? props.text_noOptions : props.text_create + '...'}
    {...styles} />

  return (hasOptions || props.creatable) && <Wrapper {...styles} ref={selfRef}>
    {props.name && <HtmlFieldData
      name={props.name}
      itemList={props.selection} />}

    <SelectionWrapper
      onFocus={onFocus}
      onBlur={onBlur}
      svg_Expand={props.svg_Expand}
      {...styles}
      areOptionsOpen={areOptionsOpen}
      SelectionList={
        showSelection && <SelectionList
          itemList={props.selection}
          onClick={onRemove}
          onMouseOver={onHoverSelection}
          onMouseOut={onSelectionOut}
          removable={!props.disabled && props.removable}
          svg_Remove={props.svg_Remove}
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
      <DivRelative><OptionsWrapper {...styles}>{optionList}</OptionsWrapper></DivRelative>}

    {props.appendToBody && areOptionsOpen && ReactDOM.createPortal(
      <AppendToBodyOptionsWrapper
        {...styles}
        parentRef={selfRef}
        filteredOptions={filteredOptions}
        StyledAppendToBodyOptionsWrapper={StyledAppendToBodyOptionsWrapper}
        updateOn={[props.selection]}>
      {optionList}</AppendToBodyOptionsWrapper>,
      document.body)}</Wrapper>
}

Select.defaultProps = defaultProps

Select.propTypes = simpleNewInputPropTypes

export default Select
