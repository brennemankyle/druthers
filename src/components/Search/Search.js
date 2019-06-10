import React from 'react'
import PropTypes from 'prop-types'

let Search = (props) => {
  return <input type="text" placeholder={props.searchText} key="search" />
}

Search.defaultProps = {
}

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
}

export default Search
