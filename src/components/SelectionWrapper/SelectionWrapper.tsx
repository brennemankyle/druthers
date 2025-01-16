import React, {
  useRef,
  MouseEventHandler,
  ReactElement,
  forwardRef,
  TouchEventHandler,
  ForwardedRef,
  RefObject,
} from "react";
import { MassagedSelectProps } from "../../utils/SelectTypes";

export interface Props {
  className?: string;
  areOptionsOpen: boolean;
  Search: ReactElement;
  SelectionList: ReactElement;
}

export type SelectionWrapperProps = Props & MassagedSelectProps;

const preventBlur: MouseEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

const preventBlurTouch: TouchEventHandler<HTMLDivElement> = (e) =>
  e.preventDefault();

const SelectionWrapper = forwardRef(function SelectionWrapper(
  props: SelectionWrapperProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const _searchRef = useRef<HTMLInputElement>(null);
  const searchRef: RefObject<HTMLInputElement> =
    (ref as RefObject<HTMLInputElement>) ?? _searchRef;

  let onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if ((e.target as HTMLDivElement).classList.contains("remove")) return; // Don't open options if remove was clicked

    if (!searchRef || !searchRef.current) {
      return;
    }

    if (!props.areOptionsOpen) {
      searchRef.current.focus(); // Open options
    } else {
      searchRef.current.blur(); // Close options
    }
  };

  const Search = React.cloneElement(props.Search, {
    ref: searchRef,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  });
  let Expand = props.svg_Expand;

  return (
    <div
      className={props.className}
      onClick={onClick}
      onMouseDown={preventBlur}
      onTouchStart={preventBlurTouch}
    >
      <div>
        {props.SelectionList}
        {Search}
      </div>
      <span className="divider"></span>
      <Expand />
    </div>
  );
});

export default SelectionWrapper;
