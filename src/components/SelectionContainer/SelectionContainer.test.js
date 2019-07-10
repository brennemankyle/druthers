import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, mockEvent, mockElement, mockInput } from '../../mocks'
import SelectionContainer from './SelectionContainer'

let onFocus = jest.fn()
let onBlur = jest.fn()

it('renders', () => {
  const wrapper = shallow(<SelectionContainer
    styles={mockStyles}
    className="test"
    areOptionsOpen={false}
    onFocus={onFocus}
    onBlur={onBlur}
    SelectionList={mockElement}
    Search={mockInput} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders disabled', () => {
  let styles = {
    disabled: true,
    ...mockStyles
  }

  const wrapper = shallow(<SelectionContainer
    styles={styles}
    className="test"
    areOptionsOpen={false}
    onFocus={onFocus}
    onBlur={onBlur}
    SelectionList={mockElement}
    Search={mockInput} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})
