import React from "react";
import styled from "@emotion/styled";
import ItemList from "./ItemList";

const SelectionList = styled(ItemList)(
  (props) => `
  ${
    props.styles_multiple
      ? `display: inline;`
      : `display: inline-block;
      &:not(:empty) {
        width: 100%;
      }`
  }
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: ${props.styles_colors_text};
`
);

const OptionList = styled(ItemList)(
  (props) => `
  color: ${props.styles_colors_text};
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  border-color: ${props.styles_colors_secondary};
  border-width: ${props.styles_borderWidth};
  border-style: ${props.styles_borderStyle};
  border-radius: ${props.styles_borderRadius};

  .truncate-show, .truncate-hide {
    cursor: pointer;
  }
`
);

export { SelectionList, OptionList };
