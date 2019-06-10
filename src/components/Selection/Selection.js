import React from 'react'
import PropTypes from 'prop-types'

let Selection = (props) => {
  return <li data-value={props.selectionItem.value}>{props.selectionItem.label}</li>
}

Selection.propTypes = {
  selectionItem: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default Selection
