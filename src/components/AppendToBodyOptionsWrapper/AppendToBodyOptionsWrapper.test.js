import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, MockElement, mockItemList } from '../../mocks'
import AppendToBodyOptionsWrapper from './AppendToBodyOptionsWrapper'
import useRefRect from '../../hooks/useRefRect/useRefRect'
import usePlaceAbove from '../../hooks/usePlaceAbove/usePlaceAbove'

jest.mock('../../hooks/useRefRect/useRefRect', () => {
  return () => {
    return {
      "bottom": 80,
      "height": 80,
      "left": 0,
      "right": 200,
      "top": 0,
      "width": 200,
      "x": 0,
      "y": 600,
    }
  }
})

jest.mock('../../hooks/usePlaceAbove/usePlaceAbove', () => {
  return () => {
    return true
  }
})

global.console.error = jest.fn()

it('renders', () => {
  const parentRef = React.createRef()
  const wrapper = mount(<AppendToBodyOptionsWrapper
    styles={mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={mockItemList}
    StyledAppendToBodyOptionsWrapper={MockElement}><MockElement /></AppendToBodyOptionsWrapper>)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('forwards ref', () => {
  const parentRef = React.createRef()
  const wrapper = shallow(<AppendToBodyOptionsWrapper
    styles={mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={[]}
    StyledAppendToBodyOptionsWrapper={MockElement} />)

  expect(parentRef.current).toBeDefined()
})
