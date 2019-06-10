import React from 'react'
import PropTypes from 'prop-types'

let Search = (props) => {
  return <input
    type="text"
    placeholder={props.searchText}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    key="search" />
}

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default Search
