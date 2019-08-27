import React, { useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import useRefRect from '../../hooks/useRefRect/useRefRect'
import usePlaceAbove from '../../hooks/usePlaceAbove/usePlaceAbove'
import Wrapper from '../Wrapper/Wrapper'

let StyledAppendToBodyOptionsWrapper = (props, ref) => {
  let {className, children, placeOptionsAbove, parentRect, ...otherProps} = props

  return <Wrapper className={className} ref={ref} {...otherProps}>{children}</Wrapper>
}

StyledAppendToBodyOptionsWrapper = forwardRef(StyledAppendToBodyOptionsWrapper)

let AppendToBodyOptionsWrapper = (props) => {
  let {className, children, parentRef, filteredOptions, updateOn, StyledAppendToBodyOptionsWrapper, ...otherProps} = props
  const ref = useRef(null)
  const parentRect = useRefRect(parentRef, updateOn)
  const optionsWrapperRect = useRefRect(ref, updateOn)
  const placeOptionsAbove = usePlaceAbove(parentRect, optionsWrapperRect, updateOn)

  if (placeOptionsAbove && children) {
    filteredOptions = filteredOptions.reverse()
    children = React.cloneElement(children, {itemList: filteredOptions})
  }

  return <StyledAppendToBodyOptionsWrapper
    className={className}
    ref={ref}
    placeOptionsAbove={placeOptionsAbove}
    parentRect={parentRect}
    {...otherProps}>{children}</StyledAppendToBodyOptionsWrapper>
}

AppendToBodyOptionsWrapper.defaultProps = {
  updateOn: [],
}

AppendToBodyOptionsWrapper.propTypes = {
  parentRef: PropTypes.object.isRequired,
  filteredOptions: AppPropTypes.itemList.isRequired,
  updateOn: PropTypes.array.isRequired,
  StyledAppendToBodyOptionsWrapper: AppPropTypes.element.isRequired,
  ...AppPropTypes.styles,
}

export { StyledAppendToBodyOptionsWrapper }
export default AppendToBodyOptionsWrapper
