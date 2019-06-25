import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let ItemList = (props) => {
  let renderItem = (item) =>
    <props.Item item={item} canRemove={props.canRemove} key={item.value} multiple={props.multiple} />

  return !!props.itemList.length && (
    <ul className={props.className} onMouseDown={props.onClick}>
      {props.itemList.map(renderItem)}
    </ul>
  )
}

ItemList.defaultProps = {
  canRemove: false,
}

ItemList.propTypes = {
  itemList: AppPropTypes.itemList.isRequired,
  canRemove: PropTypes.bool,
  onClick: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
  Item: AppPropTypes.element.isRequired,
}

export default ItemList
