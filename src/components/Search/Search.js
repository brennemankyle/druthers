import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Search = (props, ref) => {
  return <input
    className={props.className + ' search'}
    ref={ref}
    type="text"
    placeholder={props.placeholder}
    onChange={props.onChange}
    onMouseDown={props.onClick}
    onKeyDown={props.onKeyDown}
    value={props.searchText}
    key="search" />
}

Search = forwardRef(Search)

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export default Search
