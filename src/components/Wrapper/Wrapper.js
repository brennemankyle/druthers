import React, { forwardRef } from 'react'
import AppPropTypes from '../../utils/AppPropTypes'

let Wrapper = (props, ref) => {
  let {className, children, ...otherProps} = props

  return <div className={className} ref={ref} {...otherProps}>{children}</div>
}

Wrapper = forwardRef(Wrapper)

Wrapper.propTypes = {
  styles: AppPropTypes.styles.isRequired,
}

export default Wrapper
