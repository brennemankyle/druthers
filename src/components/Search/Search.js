import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

let Search = (props, ref) => {
  return <input
    className={props.className}
    ref={ref}
    type="text"
    placeholder={props.placeholder}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
    value={props.searchText}
    key="search" />
}

Search = forwardRef(Search)

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default Search
