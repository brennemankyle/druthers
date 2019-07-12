import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import SimpleNewInput from '../SimpleNewInput/SimpleNewInput'

let NewInput = (props) => {
  const [canCheckRadio, setCanCheckRadio] = useState(props.options.length < props.checkRadioMaxCount && !props.creatable)
  const [isLoading, setIsLoading] = useState(canCheckRadio)
  useEffect(() => {
    setIsLoading(false)
  }, [props.options, props.creatable])

  let massagedProps = props.massageData(props)

  let { DivHidden, CheckRadio, SimpleNewInput } = massagedProps.components

  if (isLoading) {
    return <DivHidden styles={massagedProps.styles} />
  } else if (canCheckRadio) {
    return <CheckRadio {...massagedProps} massaged={true} />
  } else {
    return <SimpleNewInput {...massagedProps} massaged={true} />
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
