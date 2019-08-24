import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Item = (props) => {
  let Remove = props.svg_Remove

  return (
    <li className={props.className} val={props.item.value}>
      {props.item.label}
      {props.removable &&
        <button className="remove" type="button" val={props.item.value} tabIndex="-1">
          <Remove item={props.item} />
        </button>}
    </li>
  )
}

Item.propTypes = {
  removable: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  svg_Remove: AppPropTypes.element,
  ...AppPropTypes.styles,
}

export default Item
