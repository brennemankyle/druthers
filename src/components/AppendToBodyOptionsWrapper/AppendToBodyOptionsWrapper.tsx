import React, { useRef, forwardRef, ReactElement } from "react";
import useRefRect from "../../hooks/useRefRect/useRefRect";
import usePlaceAbove from "../../hooks/usePlaceAbove/usePlaceAbove";
import Wrapper from "../Wrapper/Wrapper";
import { Item } from "../../utils/SelectTypes";
import { DomRect } from "../../hooks/useRefRect/useRefRect";

export interface StyledAppendToBodyOptionsWrapperProps {
  className: string;
  children: ReactElement;
  placeOptionsAbove: boolean;
  parentRect: DomRect;
}

// Only props can by used for styled components, therefore AppendToBodyOptionsWrapper can't use it's state to be styled
const StyledAppendToBodyOptionsWrapper = forwardRef<
  ReactElement,
  StyledAppendToBodyOptionsWrapperProps
>(function StyledAppendToBodyOptionsWrapper(
  props: StyledAppendToBodyOptionsWrapperProps,
  ref
): ReactElement {
  let { className, children, placeOptionsAbove, parentRect, ...otherProps } =
    props;

  return (
    <Wrapper className={className} ref={ref} {...otherProps}>
      {children}
    </Wrapper>
  );
});

interface AppendToBodyOptionsWrapperProps {
  className: string;
  children: ReactElement;
  parentRef: null;
  filteredOptions: Item[];
  updateOn: string[];
  StyledWrapper: React.ForwardRefExoticComponent<
    StyledAppendToBodyOptionsWrapperProps &
      React.RefAttributes<
        React.ReactElement<any, string | React.JSXElementConstructor<any>>
      >
  >;
}

function AppendToBodyOptionsWrapper({
  className,
  children,
  parentRef,
  filteredOptions,
  updateOn = [],
  StyledWrapper = StyledAppendToBodyOptionsWrapper,
  ...otherProps
}: AppendToBodyOptionsWrapperProps) {
  const ref = useRef(null);
  const parentRect = useRefRect(parentRef, updateOn);
  const optionsWrapperRect = useRefRect(ref, updateOn);
  const placeOptionsAbove = usePlaceAbove(
    parentRect,
    optionsWrapperRect,
    updateOn
  );

  if (placeOptionsAbove && children) {
    filteredOptions = filteredOptions.reverse();
    children = React.cloneElement(children, { itemList: filteredOptions });
  }

  return (
    <StyledWrapper
      className={className}
      ref={ref}
      placeOptionsAbove={placeOptionsAbove}
      parentRect={parentRect}
      {...otherProps}
    >
      {children}
    </StyledWrapper>
  );
}

export { StyledAppendToBodyOptionsWrapper };
export default AppendToBodyOptionsWrapper;
