import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes, { simpleNewInputPropTypes } from '../../utils/AppPropTypes'
import defaultProps from '../../utils/defaultProps'
import useWindowWidth from '../../hooks/useWindowWidth/useWindowWidth'
import Select from '../Select/Select'
import CheckRadio from '../CheckRadio/CheckRadio'
import { CheckBox, Radio, Switch } from '../styledComponents/styledComponents'

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

  let hideCheckRadio = isLoading || isOverflown
  let checkRadioStyle = {whiteSpace: 'nowrap', overflow: 'visible'}

  if (hideCheckRadio) {
    checkRadioStyle = {
      ...checkRadioStyle,
      opacity: 1,
      height: 0,
      overflowY: 'hidden',
    }
  }

  let { CheckRadio, Select } = props.components

  return [
    canCheckRadio && <CheckRadio style={checkRadioStyle} ref={checkRadioRef} {...props} massaged={true} key='CheckRadio' />,
    (!canCheckRadio || isOverflown) && <Select {...props} massaged={true} key='Select' />,
  ]
}

NewInput.defaultProps = {
  ...defaultProps,
  components: {
    ...defaultProps.components,
    Select,
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
    Select: AppPropTypes.element.isRequired,
    CheckRadio: AppPropTypes.element.isRequired,
    CheckBox: AppPropTypes.element.isRequired,
    Radio: AppPropTypes.element.isRequired,
    Switch: AppPropTypes.element.isRequired,
  }).isRequired,
}

export default NewInput
