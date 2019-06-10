import React from 'react'
import PropTypes from 'prop-types'

let HtmlFieldData = (props) => {
  return <input type="hidden" name={props.name} value={props.data.join(',')} />
}

HtmlFieldData.defaultProps = {
  name: '',
  data: [],
}

HtmlFieldData.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
}

export default HtmlFieldData
