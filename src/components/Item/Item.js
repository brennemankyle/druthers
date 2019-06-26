import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Item = (props) => {
  return (
    <li className={props.className} val={props.item.value}>
      {props.item.label}
      {props.canRemove && <button className="remove" type="button" val={props.item.value} tabIndex="-1">
        <img className="remove" src="remove.png" alt="remove" val={props.item.value} /></button>}
    </li>
  )
}

Item.propTypes = {
  canRemove: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  multiple: PropTypes.bool.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default Item
