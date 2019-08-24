import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Item = (props) => {
  return (
    <li className={props.className} val={props.item.value}>
      {props.item.label}
      {props.removable &&
        <button className="remove" type="button" val={props.item.value} tabIndex="-1">
          <svg className="remove" aria-labelledby="remove" val={props.item.value} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path className="remove" val={props.item.value} d="M10.9 8L16 13.1 13.1 16 8 10.9 2.9 16 0 13.1 5.1 8 0 2.9 2.9 0 8 5.1 13.1 0 16 2.9 10.9 8Z"/>
          </svg>
        </button>}
    </li>
  )
}

Item.propTypes = {
  removable: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  ...AppPropTypes.styles,
}

export default Item
