import React from 'react'
import PropTypes from 'prop-types'

let HtmlFieldData = (props) => {
  return <input
    type="hidden"
    name={props.name}
    value={props.selection.map((item) => item.value).join(',')} />
}

HtmlFieldData.propTypes = {
  name: PropTypes.string.isRequired,
  selection: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default HtmlFieldData
