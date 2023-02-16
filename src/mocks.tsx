import React from "react";
import defaultProps from "./utils/defaultProps";
import { withKeys, noop } from "./utils/utils";

let mockStyles = {
  styles_width: 600,
  styles_multiple: false,
  styles_disabled: false,
  styles_hasSelection: false,
  styles_hasOptions: true,
  styles_optionHighlighted: [],
  styles_rightToLeft: false,
  ...withKeys(defaultProps, "styles_"),
};

let mockItem = {
  value: "42",
  label: "Meaning of life",
};

let mockItemList = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
  { value: "4", label: "Item 4" },
  { value: "5", label: "Item 5" },
];

let mockEvent = {
  preventDefault: noop,
};

let MockElement = (props: any) => <div data-props={props} />;
let MockInput = (props: any) => <input type="text" data-props={props} />;
let MockSvg = () => (
  <svg>
    <path d="M0 0L5 5Z" />
  </svg>
);

let mockRect = {
  top: 10,
  bottom: 110,
  left: 20,
  right: 220,
  width: 200,
  height: 100,
  x: 15,
  y: 25,
};

export {
  mockStyles,
  mockItem,
  mockItemList,
  mockEvent,
  MockElement,
  MockInput,
  MockSvg,
  mockRect,
};
