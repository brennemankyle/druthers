import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, mockItem } from '../../mocks'
import Item from './Item'

it('renders', () => {
  const wrapper = shallow(<Item styles={mockStyles} item={mockItem} removable={false}></Item>)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders removable', () => {
  const wrapper = shallow(<Item styles={mockStyles} item={mockItem} removable={true}></Item>)

  expect(toJson(wrapper)).toMatchSnapshot()
})
