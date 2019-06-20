import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

const styleSelection = `
  display: inline-block;
  background-color: lightgray;
  margin: .1em;

  .remove {
    border: none;
    background-color: transparent;

    &:hover {
      color: darkred;
      background-color: #CD5C5C;
    }
  }
`

const styleOption = `
  &:hover {
    background-color: lightblue;
  }
`

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
}

export { styleSelection, styleOption }
export default Item
