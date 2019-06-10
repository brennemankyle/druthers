import React from 'react'
import PropTypes from 'prop-types'

let HtmlFieldData = (props) => {
  return <input type="hidden" name={props.name} value={props.selected.join(',')} />
}

HtmlFieldData.defaultProps = {
  name: '',
  selected: [],
}

HtmlFieldData.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.array,
}

export default HtmlFieldData
