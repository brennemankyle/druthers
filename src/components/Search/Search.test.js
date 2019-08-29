import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mockStyles } from '../../mocks'
import Search from './Search'

const placeholder = 'Placeholder'
const onChange = jest.fn()
const onFocus = jest.fn()
const onBlur = jest.fn()
const onKeyDown = jest.fn()

it('renders', () => {
  const wrapper = shallow(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false}
    className="test" />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders disabled', () => {
  let styles = {
    ...mockStyles,
    styles_disabled: true,
  }

  const wrapper = shallow(<Search
    {...styles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false}
    className="test" />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders searchText', () => {
  const wrapper = shallow(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false}
    className="test" searchText="search text" />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders hidden', () => {
  const wrapper = shallow(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={true}
    className="test" />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('forwards ref', () => {
  const ref = React.createRef()
  const wrapper = mount(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false}
    ref={ref} />)

  expect(ref.current).toBeDefined()
})

it('should keyDown', () => {
  const wrapper = shallow(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false} />)

  wrapper.find('input').simulate('keyDown')

  expect(onKeyDown).toBeCalled()
})

it('should change', () => {
  const wrapper = shallow(<Search
    {...mockStyles}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    hide={false} />)

  wrapper.find('input').simulate('change')

  expect(onChange).toBeCalled()
})
