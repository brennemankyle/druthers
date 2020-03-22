import React from "react";

let Expand = () => (
  <svg
    className="expand"
    aria-labelledby="expand"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 8"
  >
    <path d="M4 4L0 0 8 0 16 0 12 4 8 8 4 4Z" />
  </svg>
);

let Remove = props => (
  <svg
    className="remove"
    aria-labelledby="remove"
    val={props.item.value}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      className="remove"
      val={props.item.value}
      d="M10.9 8L16 13.1 13.1 16 8 10.9 2.9 16 0 13.1 5.1 8 0 2.9 2.9 0 8 5.1 13.1 0 16 2.9 10.9 8Z"
    />
  </svg>
);

let Checkmark = () => (
  <svg
    aria-labelledby="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path d="M8.5 12.5L8.5 12.5 5.5 16 0 9.5 3 6 5.5 9 13 0 16 3.5 8.5 12.5Z" />
  </svg>
);

export { Expand, Remove, Checkmark };
