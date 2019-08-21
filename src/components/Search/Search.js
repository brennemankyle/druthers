import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Search = (props, ref) => {
  return <input
    className={props.className + ' search'}
    ref={ref}
    disabled={props.styles_disabled}
    type="text"
    placeholder={props.placeholder}
    onChange={props.onChange}
    onMouseDown={props.onClick}
    onKeyDown={props.onKeyDown}
    value={props.searchText} />
}

Search = forwardRef(Search)

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  searchText: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  ...AppPropTypes.styles,
}

export default Search
