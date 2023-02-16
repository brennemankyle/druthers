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
`
);

const OptionList = styled(ItemList)(
  (props) => `
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  border: 1px solid ${props.styles_colors_secondary};
  border-radius: ${props.styles_borderRadius};
`
);

export { SelectionList, OptionList };
