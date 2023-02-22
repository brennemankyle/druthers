import React, { forwardRef, ReactElement } from "react";
import { withoutKeys } from "../../utils/utils";

interface Props {
  className: string;
  children: ReactElement;
}

const Wrapper = forwardRef(function Wrapper(props: Props, ref): ReactElement {
  let { className, children, ...otherProps } = withoutKeys(props, "styles_");

  return (
    <div className={className} ref={ref} {...otherProps}>
      {children}
    </div>
  );
});

export default Wrapper;
