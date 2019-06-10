import React from 'react'
import PropTypes from 'prop-types'

let Options = (props) => {
  let { Option } = props.components

  return props.options.map((option) => <Option option={option} key={option.value} />)
}

Options.defaultProps = {
  options: [],
}

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  components: PropTypes.shape({
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default Options
