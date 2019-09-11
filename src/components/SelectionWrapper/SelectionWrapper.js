import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import handleClick from '../../utils/handleClick'

let SelectionWrapper = (props) => {
  const searchRef = useRef(null)

  let onClick = (e) => {
    let isSearch = e.target.classList.contains('search')

    e.preventDefault()

    if (!props.areOptionsOpen) {
      searchRef.current.focus()
    }
    else {
      searchRef.current.blur()
    }
  }

  const Search = React.cloneElement(props.Search, {
    ref: searchRef,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  })
  let Expand = props.svg_Expand

  return <div
    className={props.className}
    onMouseDown={handleClick(onClick)}
    onClick={e => e.preventDefault()}
    onTouchStart={onClick}>
      <div>
        {props.SelectionList}
        {Search}
      </div>
      <span className="divider"></span>
      <Expand /></div>
}

SelectionWrapper.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  areOptionsOpen: PropTypes.bool.isRequired,
  Search: AppPropTypes.element.isRequired,
  SelectionList: PropTypes.oneOfType([AppPropTypes.element.isRequired, PropTypes.bool]),
  svg_Expand: AppPropTypes.element.isRequired,
  ...AppPropTypes.styles,
}

export default SelectionWrapper
