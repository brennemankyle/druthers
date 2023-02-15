import React, { forwardRef, MouseEventHandler } from "react";

interface Props {
  placeholder: string;
  onChange: MouseEventHandler<HTMLInputElement>;
  searchText: string;
  onKeyDown: MouseEventHandler<HTMLInputElement>;
  onFocus: MouseEventHandler<HTMLInputElement>;
  onBlur: MouseEventHandler<HTMLInputElement>;
  hide: boolean;
}

function Search(props: Props, ref) {
  return (
    <input
      className={props.className + " search"}
      ref={ref}
      disabled={props.styles_disabled}
      type="text"
      placeholder={props.placeholder}
      size={props.styles_search_size}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      value={props.searchText}
    />
  );
}

Search = forwardRef(Search);

export default Search;
