import React from 'react'
import defaultProps from './utils/defaultProps'

let noop = () => {}

let mockStyles = {
  width: '600px',
  multiple: false,
  disabled: false,
  hasSelection: false,
  hasOptions: true,
  optionHighlighted: [],
  rightToLeft: false,
  ...defaultProps.styles,
}

let mockItem = {
  value: '42',
  label: 'Meaning of life',
}

let mockItemList = [
  {value: '1', label: 'Item 1'},
  {value: '2', label: 'Item 2'},
  {value: '3', label: 'Item 3'},
  {value: '4', label: 'Item 4'},
  {value: '5', label: 'Item 5'},
]

let mockEvent = {
  preventDefault: noop
}

let MockElement = (props) => <div data-props={props} />
let MockInput = (props) => <input data-props={props} />

export {
  mockStyles,
  mockItem,
  mockItemList,
  mockEvent,
  MockElement,
  MockInput, }
