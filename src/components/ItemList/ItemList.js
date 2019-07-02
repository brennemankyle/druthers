import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

const noop = () => {}

let ItemList = (props) => {
  let renderItem = (item) =>
    <props.Item
      item={item}
      canRemove={props.canRemove}
      key={item.value}
      multiple={props.multiple}
      styles={props.styles}
      optionHighlighted={props.optionHighlighted} />

  let hasOptions = !!props.itemList.length
  let onMouseDown = hasOptions ? props.onClick : noop
  let onMouseOver = hasOptions ? props.onMouseOver : noop

  return (
    <ul className={props.className} onMouseDown={onMouseDown} onMouseOver={onMouseOver}>
      {props.itemList.map(renderItem)}
      {!hasOptions && props.noItemsText && <props.Item
        item={{value: '', label: props.noItemsText}}
        canRemove={false}
        multiple={props.multiple}
        styles={props.styles} />}
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
  noItemsText: PropTypes.string,
  onMouseOver: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
  Item: AppPropTypes.element.isRequired,
  styles: AppPropTypes.styles.isRequired,
  optionHighlighted: PropTypes.string,
}

export default ItemList
