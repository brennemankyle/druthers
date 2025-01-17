import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  KeyboardEventHandler,
} from "react";
import { MassagedSelectProps } from "../../utils/SelectTypes";

export interface Props {
  className?: string;
  searchText: string;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  hide: boolean;
}

export type SearchProps = Props & MassagedSelectProps;

const Search = forwardRef(function Search(
  props: SearchProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  return (
    <input
      className={props.className}
      ref={ref}
      disabled={props.styles_disabled}
      type="text"
      placeholder={props.placeholder}
      size={parseInt(props.styles_search_size, 10)}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      value={props.searchText}
    />
  );
});

export default Search;
