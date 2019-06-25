import React from 'react'
import PropTypes from 'prop-types'

let Container = (props) => {
  return <div
    className={props.className}
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}>{props.children}</div>
}

Container.propTypes = {
  onFocus: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
}

export default Container
