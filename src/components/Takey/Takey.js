import React from 'react'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import PropTypes from 'prop-types'

let Takey = (props) => {
  return <props.htmlFieldData name={props.name} />
}

Takey.defaultProps = {
  name: '',
  htmlFieldData: HtmlFieldData,
}

Takey.propTypes = {
  name: PropTypes.string,
  htmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default Takey
