import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let SelectionWrapper = (props) => {
  const searchRef = useRef(null)

  let onFocus = (e) => {
    if (!props.areOptionsOpen) {
      props.onFocus(e)

      searchRef.current.focus()
    } else {
      e.target.blur() // Close if already open options
    }
  }
  let onBlur = (e) => {
    if (e.target.classList.contains('search')) {
      setTimeout(() => { // Call blur after focus event
        props.onBlur(e)
      })
    }
  }
  let onSearchClick = (e) => {
    if (props.areOptionsOpen) {
      // Call blur on search click
      e.preventDefault()
      searchRef.current.blur()
    }
  }

  const Search = React.cloneElement(props.Search, {
    onClick: onSearchClick,
    ref: searchRef,
  })

  return <div
    className={props.className}
    tabIndex={props.styles_disabled ? 'false' : '-1'}
    onFocus={onFocus}
    onBlur={onBlur}>
      <div>
        {props.SelectionList}
        {Search}
      </div>
      <span className="divider"></span>
      <svg className="expand" aria-labelledby="expand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8">
        <path d="M4 4L0 0 8 0 16 0 12 4 8 8 4 4Z"/>
      </svg></div>
}

SelectionWrapper.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  areOptionsOpen: PropTypes.bool.isRequired,
  Search: AppPropTypes.element.isRequired,
  SelectionList: PropTypes.oneOfType([AppPropTypes.element.isRequired, PropTypes.bool]),
  ...AppPropTypes.styles,
}

export default SelectionWrapper
