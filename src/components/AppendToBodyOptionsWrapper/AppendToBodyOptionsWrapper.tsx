import React, { useRef, forwardRef, ReactElement } from "react";
import useRefRect from "../../hooks/useRefRect/useRefRect";
import usePlaceAbove from "../../hooks/usePlaceAbove/usePlaceAbove";
import Wrapper from "../Wrapper/Wrapper";
import { Item } from "../../utils/SelectTypes";
import { DomRect } from "../../hooks/useRefRect/useRefRect";

interface StyledAppendToBodyOptionsWrapperProps {
  className: string;
  children: ReactElement;
  placeOptionsAbove: boolean;
  parentRect: DomRect;
}

// Only props can by used for styled components, therefore AppendToBodyOptionsWrapper can't use it's state to be styled
const StyledAppendToBodyOptionsWrapper = forwardRef(
  function StyledAppendToBodyOptionsWrapper(
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
  }
);

interface AppendToBodyOptionsWrapperProps {
  className: string;
  children: ReactElement;
  parentRef: null;
  filteredOptions: Item[];
  updateOn: string[];
  StyledAppendToBodyOptionsWrapper: ReactElement;
}

function AppendToBodyOptionsWrapper(props: AppendToBodyOptionsWrapperProps) {
  let {
    className,
    children,
    parentRef,
    filteredOptions,
    updateOn,
    StyledAppendToBodyOptionsWrapper,
    ...otherProps
  } = props;
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
    <StyledAppendToBodyOptionsWrapper
      className={className}
      ref={ref}
      placeOptionsAbove={placeOptionsAbove}
      parentRect={parentRect}
      {...otherProps}
    >
      {children}
    </StyledAppendToBodyOptionsWrapper>
  );
}

AppendToBodyOptionsWrapper.defaultProps = {
  updateOn: [],
};

export { StyledAppendToBodyOptionsWrapper };
export default AppendToBodyOptionsWrapper;
