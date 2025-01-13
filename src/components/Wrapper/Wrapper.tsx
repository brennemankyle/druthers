import React, { ForwardedRef, forwardRef, ReactElement } from "react";
import { withoutKeys } from "../../utils/utils";
import { Styles } from "../../utils/SelectTypes";

interface Props {
  className?: string;
  children: ReactElement;
}

type WrapperProps = Props & Styles;

const Wrapper = forwardRef(function Wrapper(
  props: WrapperProps,
  ref: ForwardedRef<HTMLDivElement> | undefined
): ReactElement {
  let { className, children, ...otherProps } = withoutKeys(props, "styles_");

  return (
    <div className={className} ref={ref} {...otherProps}>
      {children}
    </div>
  );
});

export default Wrapper;
