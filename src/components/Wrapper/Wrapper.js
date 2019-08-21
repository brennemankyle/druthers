import React, { forwardRef } from 'react'
import AppPropTypes from '../../utils/AppPropTypes'
import withoutKeys from '../../utils/withoutKeys'

let Wrapper = (props, ref) => {
  let {className, children, ...otherProps} = withoutKeys(props, 'styles_')

  return <div className={className} ref={ref} {...otherProps}>{children}</div>
}

Wrapper = forwardRef(Wrapper)

Wrapper.propTypes = {
  ...AppPropTypes.styles,
}

export default Wrapper
