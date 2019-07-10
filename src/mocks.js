import React from 'react'

let noop = () => {}

let mockStyles = {
  colors: {}
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

let mockElement = (props) => <div data-props={props} />
let mockInput = (props) => <input data-props={props} />

export {
  mockStyles,
  mockItem,
  mockItemList,
  mockEvent,
  mockElement,
  mockInput, }
