import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles, mockItemList, mockElement } from '../../mocks'
import ItemList from './ItemList'

const onClick = jest.fn()
const onMouseOver = jest.fn()

it('renders', () => {
  const wrapper = shallow(<ItemList
    styles={mockStyles}
    itemList={mockItemList}
    Item={mockElement} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders removable', () => {
  const wrapper = shallow(<ItemList
    styles={mockStyles}
    itemList={mockItemList}
    Item={mockElement}
    removable={true} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders no items', () => {
  const wrapper = shallow(<ItemList
    styles={mockStyles}
    itemList={[]}
    Item={mockElement}
    removable={true}
    noItemsText="None"
    onClick={onClick}
    onMouseOver={onMouseOver} />)

  wrapper.find('ul').simulate('mouseDown')
  wrapper.find('ul').simulate('mouseOver')

  expect(onClick).not.toBeCalled()
  expect(onMouseOver).not.toBeCalled()
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('should click', () => {
  const wrapper = shallow(<ItemList
    styles={mockStyles}
    itemList={mockItemList}
    Item={mockElement}
    onClick={onClick} />)

  wrapper.find('ul').simulate('mouseDown')

  expect(onClick).toBeCalled()
})

it('should mouseOver', () => {
  const wrapper = shallow(<ItemList
    styles={mockStyles}
    itemList={mockItemList}
    Item={mockElement}
    onMouseOver={onMouseOver} />)

  wrapper.find('ul').simulate('mouseOver')

  expect(onMouseOver).toBeCalled()
})
