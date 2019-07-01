import React, { forwardRef } from 'react'
import Container from '../Container/Container'
import AppPropTypes from '../../utils/AppPropTypes'

let AppendToBodyOptionsContainer = (props, ref) => {
  let {className, children, ...otherProps} = props

  return <Container className={props.className} ref={ref} {...otherProps}>{props.children}</Container>
}

AppendToBodyOptionsContainer = forwardRef(AppendToBodyOptionsContainer)

AppendToBodyOptionsContainer.propTypes = {
  styles: AppPropTypes.styles.isRequired,
}

export default AppendToBodyOptionsContainer
