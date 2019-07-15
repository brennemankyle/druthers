import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Item = (props) => {
  return (
    <li className={props.className} val={props.item.value}>
      {props.item.label}
      {props.removable && <button className="remove" type="button" val={props.item.value} tabIndex="-1">
        <img className="remove" src={props.imgSrc} alt="remove" val={props.item.value} /></button>}
    </li>
  )
}

Item.defaultProps = {
  imgSrc: 'remove.png',
}

Item.propTypes = {
  removable: PropTypes.bool.isRequired,
  item: AppPropTypes.item,
  imgSrc: PropTypes.string,
  styles: AppPropTypes.styles.isRequired,
}

export default Item
