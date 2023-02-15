import React, { useRef, MouseEventHandler, ReactElement } from "react";

interface Props {
  onFocus: MouseEventHandler<HTMLInputElement>;
  onBlur: MouseEventHandler<HTMLInputElement>;
  areOptionsOpen: boolean;
  Search: ReactElement;
  SelectionList: ReactElement;
  svg_Expand: ReactElement;
}

const preventBlur = (e) => e.preventDefault();

let SelectionWrapper = (props) => {
  const searchRef = useRef(null);

  let onClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("remove")) return; // Don't open options if remove was clicked

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
      onTouchStart={preventBlur}
    >
      <div>
        {props.SelectionList}
        {Search}
      </div>
      <span className="divider"></span>
      <Expand />
    </div>
  );
};

export default SelectionWrapper;
