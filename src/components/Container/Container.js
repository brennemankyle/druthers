import React from 'react'
import PropTypes from 'prop-types'

const styleContainer = `
  border: 1px solid gray;
`

let Container = (props) => {
  return <div
    className={props.className}
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}>{props.children}</div>
}

Container.propTypes = {
  onFocus: PropTypes.func,
}

export { styleContainer }
export default Container
