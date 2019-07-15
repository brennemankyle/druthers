import React from 'react'
import { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'

let SimpleNewInput = (rawProps) => {
  let props = rawProps.massaged ? rawProps : rawProps.massageData(rawProps)

  let { InternalNewInput } = props.components

  return <InternalNewInput {...props} />
}

SimpleNewInput.defaultProps = defaultProps

SimpleNewInput.propTypes = simpleNewInputPropTypes

export default SimpleNewInput
