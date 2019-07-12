import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import massageData from '../../utils/massageData'
import SimpleNewInput from '../SimpleNewInput/SimpleNewInput'

let NewInput = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [props.options, props.creatable])

  let massagedProps = massageData(props)

  let { DivHidden, CheckRadio, SimpleNewInput } = massagedProps.components

  if (isLoading) {
    return <DivHidden styles={massagedProps.styles} />
  } else {
    return <CheckRadio {...massagedProps} massaged={true} />
  }
}

NewInput.defaultProps = {
  ...defaultProps,
  components: {
    ...defaultProps.components,
    SimpleNewInput,
  },
}

NewInput.propTypes = {
  ...simpleNewInputPropTypes,
  components: PropTypes.shape({
    ...simpleNewInputPropTypes.components,
    SimpleNewInput: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default NewInput
