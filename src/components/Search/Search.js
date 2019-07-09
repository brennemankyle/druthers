import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let Search = (props, ref) => {
  let style = props.hide ? {
    opacity: 0,
    width: 0,
  } : {}

  return <input
    className={props.className + ' search'}
    ref={ref}
    style={style}
    disabled={props.styles.disabled}
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
  styles: AppPropTypes.styles.isRequired,
}

export default Search
