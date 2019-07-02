import React, { forwardRef } from 'react'
import AppPropTypes from '../../utils/AppPropTypes'

let Container = (props, ref) => {
  let {className, children, ...otherProps} = props

  return <div className={className} ref={ref} {...otherProps}>{children}</div>
}

Container = forwardRef(Container)

Container.propTypes = {
  styles: AppPropTypes.styles.isRequired,
}

export default Container
