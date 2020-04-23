import styled from "@emotion/styled";
import RawWrapper from "./Wrapper";

const Wrapper = styled(RawWrapper)(
  props => `
  font-size: ${props.styles_fontSize};
  ${props.styles_rightToLeft ? `transform: scaleX(-1);` : ``}
`
);

const OptionsWrapper = styled(RawWrapper)(
  props => `
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props.styles_colors_background};
  width: ${props.styles_width}px;
  ${!props.styles_hasOptions && !props.styles_multiple ? `display: none;` : ``}
`
);

export { Wrapper, OptionsWrapper };
