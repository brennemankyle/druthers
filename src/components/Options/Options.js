import React from 'react'
import PropTypes from 'prop-types'

let Options = (props) => {
  let { Option, Search } = props.components

  return props.areOptionsOpen && [
    !props.multiple && <Search
      searchText={props.searchText}
      key="search" />,
    props.options.map((option) => <Option option={option} key={option.value} />)
  ]
}

Options.propTypes = {
  areOptionsOpen: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  components: PropTypes.shape({
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default Options
