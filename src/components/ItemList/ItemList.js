import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

const noop = () => {}

let ItemList = (props) => {
  let renderItem = (item) =>
    <props.Item
      item={item}
      removable={props.removable}
      key={item.value}
      styles={props.styles} />

  let hasItems = !!props.itemList.length
  let onMouseDown = hasItems ? props.onClick : noop
  let onMouseOver = hasItems ? props.onMouseOver : noop

  return (
    <ul className={props.className} onMouseDown={onMouseDown} onMouseOver={onMouseOver}>
      {props.itemList.map(renderItem)}
      {!hasItems && props.noItemsText && <props.Item
        item={{value: '', label: props.noItemsText}}
        removable={false}
        styles={props.styles} />}
    </ul>
  )
}

ItemList.defaultProps = {
  removable: false,
}

ItemList.propTypes = {
  itemList: AppPropTypes.itemList.isRequired,
  removable: PropTypes.bool,
  onClick: PropTypes.func,
  noItemsText: PropTypes.string,
  onMouseOver: PropTypes.func,
  Item: AppPropTypes.element.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default ItemList
