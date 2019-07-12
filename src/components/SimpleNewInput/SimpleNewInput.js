import React from 'react'
import { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import massageData from '../../utils/massageData'

let SimpleNewInput = (props) => {
  let massagedProps = props.massaged ? props : massageData(props)

  let { InternalNewInput } = massagedProps.components

  return <InternalNewInput {...massagedProps} />
}

SimpleNewInput.defaultProps = defaultProps

SimpleNewInput.propTypes = simpleNewInputPropTypes

export default SimpleNewInput
