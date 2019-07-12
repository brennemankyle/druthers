import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import SimpleNewInput from '../SimpleNewInput/SimpleNewInput'
import { CheckRadio, CheckBox, Radio } from '../styledComponents/styledComponents'

let hasOverflown = (element) =>
  element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth

let NewInput = (props) => {
  const checkRadioRef = useRef(null)
  const [canCheckRadio, setCanCheckRadio] = useState(props.options.length < props.checkRadioMaxCount && !props.creatable)
  const [isLoading, setIsLoading] = useState(canCheckRadio)
  useEffect(() => {
    if (hasOverflown(checkRadioRef.current)) setCanCheckRadio(false)
    setIsLoading(false)
  }, [props.options, props.creatable])

  let massagedProps = props.massageData(props)

  let { CheckRadio, SimpleNewInput } = massagedProps.components

  if (canCheckRadio) {
    return <CheckRadio ref={checkRadioRef} hide={isLoading} {...massagedProps} massaged={true} />
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
