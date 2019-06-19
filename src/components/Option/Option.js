import React from 'react'
import PropTypes from 'prop-types'

const styleOption = `
  &:hover {
    background-color: lightblue;
  }
`

let Option = (props) => {
  return <li className={props.className} value={props.option.value}>{props.option.label}</li>
}

Option.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired
}

export { styleOption }
export default Option
