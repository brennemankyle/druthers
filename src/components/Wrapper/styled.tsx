import React from "react";
import styled from "@emotion/styled";
import RawWrapper from "./Wrapper";

export const Wrapper = styled(RawWrapper)(
  (props) => `
  font-size: ${props.styles_fontSize};
  ${props.styles_rightToLeft ? `transform: scaleX(-1);` : ``}
`
);

export const OverlayOptionsWrapper = styled(RawWrapper)(
  (props) => `
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props.styles_colors_background};
  width: ${props.styles_width}px;
  ${!props.styles_hasOptions && !props.styles_multiple ? `display: none;` : ``}
`
);

export const InPlaceOptionsWrapper = styled(Wrapper)`
  background-color: ${(props) => props.styles_colors_background};
  width: ${(props) => props.styles_width}px;
`;
