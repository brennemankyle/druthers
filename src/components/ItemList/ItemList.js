import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let ItemList = (props) => {
  let renderItem = (item) =>
    <props.Item
      item={item}
      canRemove={props.canRemove}
      key={item.value}
      multiple={props.multiple}
      styles={props.styles}
      optionHighlighted={props.optionHighlighted} />

  return !!props.itemList.length && (
    <ul className={props.className} onMouseDown={props.onClick} onMouseOver={props.onMouseOver}>
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
  onMouseOver: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
  Item: AppPropTypes.element.isRequired,
  styles: AppPropTypes.styles.isRequired,
  optionHighlighted: PropTypes.string,
}

export default ItemList
