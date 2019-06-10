import React from 'react'
import PropTypes from 'prop-types'

let Search = (props) => {
  return <input
    type="text"
    placeholder={props.searchPlaceholder}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onChange={props.onChange}
    value={props.searchText}
    key="search" />
}

Search.propTypes = {
  searchPlaceholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default Search
