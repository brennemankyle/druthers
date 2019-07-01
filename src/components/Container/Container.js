import React, { forwardRef } from 'react'
import AppPropTypes from '../../utils/AppPropTypes'

let Container = (props, ref) => {
  let {className, children, ...otherProps} = props

  return <div className={props.className} ref={ref} {...otherProps}>{props.children}</div>
}

Container = forwardRef(Container)

Container.propTypes = {
  styles: AppPropTypes.styles.isRequired,
}

export default Container
