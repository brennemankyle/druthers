import React, { useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import useRefRect from '../../hooks/useRefRect/useRefRect'
import usePlaceAbove from '../../hooks/usePlaceAbove/usePlaceAbove'
import Container from '../Container/Container'

let StyledAppendToBodyOptionsContainer = (props, ref) => {
  let {className, children, placeOptionsAbove, parentRect, ...otherProps} = props

  return <Container className={className} ref={ref} {...otherProps}>{children}</Container>
}

StyledAppendToBodyOptionsContainer = forwardRef(StyledAppendToBodyOptionsContainer)

let AppendToBodyOptionsContainer = (props) => {
  let {className, children, parentRef, filteredOptions, updateOn, StyledAppendToBodyOptionsContainer, ...otherProps} = props
  const ref = useRef(null)
  const parentRect = useRefRect(parentRef, updateOn)
  const optionContainerRect = useRefRect(ref, updateOn)
  const placeOptionsAbove = usePlaceAbove(parentRect, optionContainerRect, updateOn)

  if (placeOptionsAbove && children) {
    filteredOptions = filteredOptions.reverse()
    children = React.cloneElement(children, {itemList: filteredOptions})
  }

  return <StyledAppendToBodyOptionsContainer
    className={className}
    ref={ref}
    placeOptionsAbove={placeOptionsAbove}
    parentRect={parentRect}
    {...otherProps}>{children}</StyledAppendToBodyOptionsContainer>
}

AppendToBodyOptionsContainer.defaultProps = {
  updateOn: [],
}

AppendToBodyOptionsContainer.propTypes = {
  parentRef: PropTypes.object.isRequired,
  filteredOptions: AppPropTypes.itemList.isRequired,
  updateOn: PropTypes.array,
  StyledAppendToBodyOptionsContainer: AppPropTypes.element.isRequired,
  styles: AppPropTypes.styles.isRequired,
}

export { StyledAppendToBodyOptionsContainer }
export default AppendToBodyOptionsContainer
