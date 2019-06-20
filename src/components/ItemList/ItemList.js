import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

const styleOptions = `
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid gray;
`

const styleSelectionList = `
  display: inline-block;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

let ItemList = (props) => {
  let renderItem = (item) =>
    <props.Item item={item} canRemove={props.canRemove} key={item.value} />

  return (
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
  Item: AppPropTypes.element.isRequired,
}

export { styleSelectionList, styleOptions }
export default ItemList
