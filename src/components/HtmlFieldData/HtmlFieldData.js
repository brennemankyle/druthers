import React from 'react'
import PropTypes from 'prop-types'

let HtmlFieldData = (props) => {
  return <input type="hidden" name={props.name} value={props.selected.join(',')} />
}

HtmlFieldData.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
}

export default HtmlFieldData
