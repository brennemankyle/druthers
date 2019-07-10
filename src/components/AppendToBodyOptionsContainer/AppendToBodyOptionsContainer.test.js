import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, mockElement, mockItemList } from '../../mocks'
import AppendToBodyOptionsContainer from './AppendToBodyOptionsContainer'
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
  const wrapper = mount(<AppendToBodyOptionsContainer
    styles={mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={mockItemList}
    StyledAppendToBodyOptionsContainer={mockElement}><mockElement /></AppendToBodyOptionsContainer>)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('forwards ref', () => {
  const parentRef = React.createRef()
  const wrapper = shallow(<AppendToBodyOptionsContainer
    styles={mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={[]}
    StyledAppendToBodyOptionsContainer={mockElement} />)

  expect(parentRef.current).toBeDefined()
})
