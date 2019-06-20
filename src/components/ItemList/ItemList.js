import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

const styleOptions = `
  list-style-type: none;
  padding: 0;
  border: 1px solid gray;
`

const styleSelectionList = `
  display: inline-block;
  list-style-type: none;
  padding: 0;
`

let ItemList = (props) => {
  return <ul
    className={props.className}
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onMouseDown={props.onClick}>
      {props.itemList.length
        ? props.itemList.map((item) => <props.Item item={item} canRemove={props.canRemove} key={item.value} />)
        : props.placeholder}</ul>
}

ItemList.defaultProps = {
  placeholder: '',
  canRemove: false,
}

ItemList.propTypes = {
  itemList: AppPropTypes.itemList.isRequired,
  canRemove: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  Item: AppPropTypes.element.isRequired,
}

export { styleSelectionList, styleOptions }
export default ItemList
