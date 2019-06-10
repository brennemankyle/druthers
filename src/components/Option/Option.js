import React from 'react'
import PropTypes from 'prop-types'

let Option = (props) => {
  return <div value={props.option.value}>{props.option.label}</div>
}

Option.defaultProps = {
  option: [],
}

Option.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })
}

export default Option
