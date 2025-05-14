import { ForwardRefExoticComponent } from "react";
import styled, { StyledComponent } from "@emotion/styled";
import RawWrapper from "./Wrapper";

export const Wrapper = styled(RawWrapper)(
  (props) => `
  font-size: ${props.styles_fontSize};
  ${props.styles_rightToLeft ? `transform: scaleX(-1);` : ``}
`
);

export const createBaseOptionsWrapper = (
  component: StyledComponent<any> | ForwardRefExoticComponent<any>
) => {
  return styled(component)(
    (props) => `
        max-height: ${props.styles_optionsWrapper_maxHeight};
        overflow-y: ${props.styles_optionsWrapper_overflowY as any};
        width: ${props.styles_width}px;
        height: ${props.styles_optionsWrapper_maxHeight};
        overflow-x: hidden;
  `
  );
};
const BaseOptionsWrapper = createBaseOptionsWrapper(RawWrapper);

export const OverlayOptionsWrapper = styled(BaseOptionsWrapper)(
  (props) => `
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props.styles_colors_background};
  ${!props.styles_hasOptions && !props.styles_multiple ? `display: none;` : ``}
`
);

export const InPlaceOptionsWrapper = styled(BaseOptionsWrapper)`
  background-color: ${(props) => props.styles_colors_background};
`;
