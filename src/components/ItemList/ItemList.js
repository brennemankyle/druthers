import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import withKeys from '../../utils/withKeys'

const noop = () => {}

let ItemList = (props) => {
  let styles = withKeys(props, 'styles_')
  let Item = props.Item

  let renderItem = (item) =>
    <Item
      item={item}
      removable={props.removable}
      key={item.value}
      svg_Remove={props.svg_Remove}
      {...styles} />

  let hasItems = !!props.itemList.length
  let onMouseDown = hasItems ? props.onClick : noop
  let onMouseOver = hasItems ? props.onMouseOver : noop
  let onMouseOut = hasItems ? props.onMouseOut : noop

  return (
    <ul className={props.className} onMouseDown={onMouseDown} onPointerDown={onMouseDown} onTouchStart={onMouseDown} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {props.itemList.map(renderItem)}
      {!hasItems && props.noItemsText && <Item
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
  onMouseOut: PropTypes.func,
  Item: AppPropTypes.element.isRequired,
  svg_Remove: AppPropTypes.element,
  ...AppPropTypes.styles,
}

export default ItemList
