import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import withKeys from '../../utils/withKeys'

const noop = () => {}

let ItemList = (props) => {
  let styles = withKeys(props, 'styles_')

  let renderItem = (item) =>
    <props.Item
      item={item}
      removable={props.removable}
      key={item.value}
      {...styles} />

  let hasItems = !!props.itemList.length
  let onMouseDown = hasItems ? props.onClick : noop
  let onMouseOver = hasItems ? props.onMouseOver : noop

  return (
    <ul className={props.className} onMouseDown={onMouseDown} onMouseOver={onMouseOver}>
      {props.itemList.map(renderItem)}
      {!hasItems && props.noItemsText && <props.Item
        item={{value: '', label: props.noItemsText}}
        removable={false}
        {...styles} />}
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
  ...AppPropTypes.styles,
}

export default ItemList
