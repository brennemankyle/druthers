import styled from "@emotion/styled";
import RawWrapper from "./Wrapper";

const Wrapper = styled(RawWrapper)`
  font-size: ${props => props.styles_fontSize};
  ${props => props.styles_rightToLeft && `transform: scaleX(-1);`}
`;

const OptionsWrapper = styled(RawWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props => props.styles_colors_background};
  width: ${props => props.styles_width}px;
  ${props =>
    !props.styles_hasOptions && !props.styles_multiple && `display: none;`}
`;

export { Wrapper, OptionsWrapper };
