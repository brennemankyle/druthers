import React from 'react'
import PropTypes from 'prop-types'

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
