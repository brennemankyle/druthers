import React from 'react'
import PropTypes from 'prop-types'

let Options = (props) => {
  let { Option, Search } = props.components

  let options = props.options

  if (props.searchText) {
    options = options
      .filter((options) => options.label.includes(props.searchText) || options.value.includes(props.searchText))
  }

  return props.areOptionsOpen && [
    !props.multiple && <Search
      searchPlaceholder={props.searchPlaceholder}
      searchText={props.searchText}
      onChange={props.onSearch}
      key="search" />,
    options
      .map((option) => <Option option={option} key={option.value} />)
  ]
}

Options.propTypes = {
  areOptionsOpen: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
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
