import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Item = (props) => {
  return (
    <li className={props.className} value={props.item.value}>
      {props.item.label}
      {props.canRemove && <button className="remove" type="button" value={props.item.value}>x</button>}
    </li>
  )
}

Item.propTypes = {
  canRemove: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  multiple: PropTypes.bool.isRequired,
}

export default Item
