import React, { useRef, forwardRef, ReactElement, ForwardedRef } from "react";
import useRefRect from "../../hooks/useRefRect/useRefRect";
import usePlaceAbove from "../../hooks/usePlaceAbove/usePlaceAbove";
import Wrapper from "../Wrapper/Wrapper";
import { Item, Styles } from "../../utils/SelectTypes";
import { DomRect } from "../../hooks/useRefRect/useRefRect";

interface StyledProps {
  className: string;
  children: ReactElement;
  placeOptionsAbove: boolean;
  parentRect: DomRect;
}

export type StyledAppendToBodyOptionsWrapperProps = StyledProps & Styles;

// Only props can by used for styled components, therefore AppendToBodyOptionsWrapper can't use it's state to be styled
const StyledAppendToBodyOptionsWrapper = forwardRef(
  function StyledAppendToBodyOptionsWrapper(
    props: StyledAppendToBodyOptionsWrapperProps,
    ref: ForwardedRef<HTMLDivElement> | undefined
  ) {
    let { className, children, placeOptionsAbove, parentRect, ...otherProps } =
      props;

    return (
      <Wrapper className={className} ref={ref} {...otherProps}>
        {children}
      </Wrapper>
    );
  }
);

interface Props {
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

type AppendToBodyOptionsWrapperProps = Styles & Props;

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
