import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import src from "./remove.svg"

let Item = (props) => {
  return (
    <li className={props.className} val={props.item.value}>
      {props.item.label}
      {props.removable && <button className="remove" type="button" val={props.item.value} tabIndex="-1">
        <img className="remove" src={props.removeSrc} alt="remove" val={props.item.value} /></button>}
    </li>
  )
}

Item.defaultProps = {
  removeSrc: src,
}

Item.propTypes = {
  removable: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  removeSrc: PropTypes.string.isRequired,
  ...AppPropTypes.styles,
}

export default Item
