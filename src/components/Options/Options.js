import React from 'react'
import PropTypes from 'prop-types'

let Options = (props) => {
  let { Option } = props.components

  let options = props.options

  if (props.searchText) {
    // TODO move filtering and ording out
    options = options
      .filter((options) => options.label.includes(props.searchText) || options.value.includes(props.searchText))
  }

  return <ul onMouseDown={props.onClick}>
    {options.map((option) => <Option option={option} key={option.value} />)}</ul>
}

Options.propTypes = {
  searchText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  components: PropTypes.shape({
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default Options
