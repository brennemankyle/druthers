import React from 'react'
import PropTypes from 'prop-types'

let Selection = (props) => {
  return <li value={props.selectionItem.value}>
    {props.selectionItem.label}
    <button className="remove" type="button" value={props.selectionItem.value}>x</button></li>
}

Selection.propTypes = {
  selectionItem: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default Selection
