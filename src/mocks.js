import React from "react";
import defaultProps from "./utils/defaultProps";
import withKeys from "./utils/withKeys";

let noop = () => {};

let mockStyles = {
  styles_width: "600px",
  styles_multiple: false,
  styles_disabled: false,
  styles_hasSelection: false,
  styles_hasOptions: true,
  styles_optionHighlighted: [],
  styles_rightToLeft: false,
  ...withKeys(defaultProps, "styles_")
};

let mockItem = {
  value: "42",
  label: "Meaning of life"
};

let mockItemList = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
  { value: "4", label: "Item 4" },
  { value: "5", label: "Item 5" }
];

let mockEvent = {
  preventDefault: noop
};

let MockElement = props => <div data-props={props} />;
let MockInput = props => <input data-props={props} />;
let MockSvg = () => (
  <svg>
    <path d="M0 0L5 5Z" />
  </svg>
);

export {
  mockStyles,
  mockItem,
  mockItemList,
  mockEvent,
  MockElement,
  MockInput,
  MockSvg
};
