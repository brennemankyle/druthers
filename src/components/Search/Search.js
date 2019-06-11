import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

let Search = (props, ref) => {
  return <input
    ref={ref}
    type="text"
    placeholder={props.searchPlaceholder}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
    value={props.searchText}
    key="search" />
}

Search = forwardRef(Search)

Search.propTypes = {
  searchPlaceholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default Search
