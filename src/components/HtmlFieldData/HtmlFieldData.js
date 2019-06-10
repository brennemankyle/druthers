import React from 'react'
import PropTypes from 'prop-types'

let HtmlFieldData = (props) => {
  return <input type="hidden" name={props.name} value={props.selection.join(',')} />
}

HtmlFieldData.propTypes = {
  name: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
}

export default HtmlFieldData
