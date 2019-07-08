import React from 'react'
import { shallow, mount } from 'enzyme'
import { mockStyles } from '../../mocks'
import Container from './Container'

it('adds className', () => {
  const wrapper = shallow(<Container styles={mockStyles} className="test"></Container>)

  expect(wrapper.hasClass('test')).toBe(true)
})

it('renders children', () => {
  const wrapper = shallow(<Container styles={mockStyles}><div className="unique" /></Container>)

  expect(wrapper.contains(<div className="unique" />)).toBe(true)
})

it('pass props', () => {
  const wrapper = shallow(<Container styles={mockStyles} otherProp="otherProp"></Container>)

  expect(wrapper.props().otherProp).toBe('otherProp')
})

it('forwards ref', () => {
  const ref = React.createRef()
  const wrapper = mount(<Container styles={mockStyles} ref={ref}></Container>)

  expect(ref.current).toBeDefined()
})
