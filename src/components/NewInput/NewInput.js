import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import useWindowWidth from '../../hooks/useWindowWidth/useWindowWidth'
import SimpleNewInput from '../SimpleNewInput/SimpleNewInput'
import { CheckRadio, CheckBox, Radio, Switch } from '../styledComponents/styledComponents'

let hasOverflownX = (element) => element.scrollWidth > element.clientWidth

let NewInput = (rawProps) => {
  let props = rawProps.massageData(rawProps)
  const checkRadioRef = useRef(null)
  const windowWidth = useWindowWidth()
  const [canCheckRadio] = useState(props.options.length < props.checkRadioMaxCount && !props.creatable)
  const [isLoading, setIsLoading] = useState(canCheckRadio)
  const [isOverflown, setIsOverflown] = useState(false)
  useEffect(() => {
    if (canCheckRadio) setIsOverflown(hasOverflownX(checkRadioRef.current, windowWidth))
    if (isLoading) setIsLoading(false)
  }, [props.options, props.creatable, windowWidth, canCheckRadio, isLoading])

  let overflowStyle = {whiteSpace: 'nowrap', overflowX: 'visible', overflowY: 'hidden'}

  let { CheckRadio, SimpleNewInput } = props.components

  return [
    canCheckRadio && <CheckRadio style={overflowStyle} ref={checkRadioRef} hide={isLoading || isOverflown} {...props} massaged={true} key='CheckRadio' />,
    (!canCheckRadio || isOverflown) && <SimpleNewInput {...props} massaged={true} key='SimpleNewInput' />,
  ]
}

NewInput.defaultProps = {
  ...defaultProps,
  components: {
    ...defaultProps.components,
    SimpleNewInput,
    CheckRadio,
    CheckBox,
    Radio,
    Switch,
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
    Switch: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default NewInput
