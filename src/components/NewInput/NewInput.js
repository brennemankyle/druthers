import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import SimpleNewInput from '../SimpleNewInput/SimpleNewInput'
import { CheckRadio, CheckBox, Radio } from '../styledComponents/styledComponents'

let NewInput = (props) => {
  const [canCheckRadio, setCanCheckRadio] = useState(props.options.length < props.checkRadioMaxCount && !props.creatable)
  const [isLoading, setIsLoading] = useState(canCheckRadio)
  useEffect(() => {
    setIsLoading(false)
  }, [props.options, props.creatable])

  let massagedProps = props.massageData(props)

  let { CheckRadio, SimpleNewInput } = massagedProps.components

  if (isLoading && canCheckRadio) {
    return <CheckRadio hide={true} {...massagedProps} massaged={true} />
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
    CheckRadio,
    CheckBox,
    Radio,
  },
}

NewInput.propTypes = {
  ...simpleNewInputPropTypes,
  components: PropTypes.shape({
    ...simpleNewInputPropTypes.components,
    SimpleNewInput: AppPropTypes.element.isRequired,
    CheckRadio: AppPropTypes.element.isRequired,
    CheckBox: AppPropTypes.element.isRequired,
    Radio: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default NewInput
