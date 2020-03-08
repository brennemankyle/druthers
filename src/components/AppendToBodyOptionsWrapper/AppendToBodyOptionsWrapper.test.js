import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, MockElement, mockItemList } from '../../mocks'
import AppendToBodyOptionsWrapper from './AppendToBodyOptionsWrapper'
import useRefRect from '../../hooks/useRefRect/useRefRect'
import usePlaceAbove from '../../hooks/usePlaceAbove/usePlaceAbove'

it('renders', () => {
  const parentRef = React.createRef()
  const wrapper = mount(<AppendToBodyOptionsWrapper
    {...mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={mockItemList}
    StyledAppendToBodyOptionsWrapper={MockElement}><MockElement /></AppendToBodyOptionsWrapper>)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('forwards ref', () => {
  const parentRef = React.createRef()
  const wrapper = shallow(<AppendToBodyOptionsWrapper
    {...mockStyles}
    className="test"
    parentRef={parentRef}
    filteredOptions={[]}
    StyledAppendToBodyOptionsWrapper={MockElement} />)

  expect(parentRef.current).toBeDefined()
})
