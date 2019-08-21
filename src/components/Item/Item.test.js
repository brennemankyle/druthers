import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, mockItem } from '../../mocks'
import Item from './Item'

it('renders', () => {
  const wrapper = shallow(<Item
    {...mockStyles}
    item={mockItem}
    removable={false} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders removable', () => {
  const wrapper = shallow(<Item
    {...mockStyles}
    item={mockItem}
    removable={true} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})
