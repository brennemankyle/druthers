import React from 'react'
import PropTypes from 'prop-types'

const styleSelection = `
  color: brown

  .remove {
    color: green
  }
`

let Selection = (props) => {
  return <li className={props.className} value={props.selectionItem.value}>
    {props.selectionItem.label}
    <button className="remove" type="button" value={props.selectionItem.value}>x</button></li>
}

Selection.propTypes = {
  selectionItem: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export { styleSelection }
export default Selection
