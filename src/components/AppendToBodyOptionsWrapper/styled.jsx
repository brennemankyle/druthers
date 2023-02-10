import styled from "@emotion/styled";
import { StyledAppendToBodyOptionsWrapper as RawStyledAppendToBodyOptionsWrapper } from "./AppendToBodyOptionsWrapper";

const StyledAppendToBodyOptionsWrapper = styled(
  RawStyledAppendToBodyOptionsWrapper
)(
  props => `
  position: absolute;
  background-color: ${props.styles_colors_background};
  width: ${props.styles_width}px;

  ${
    props.placeOptionsAbove
      ? `bottom: ${window.innerHeight - props.parentRect.y}px;
        left: ${props.parentRect.x}px;`
      : `top: ${props.parentRect.y + props.parentRect.height}px;
        left: ${props.parentRect.x}px;`
  }
  ${props.styles_rightToLeft ? `transform: scaleX(-1);` : ``}
  ${!props.styles_hasOptions && !props.styles_multiple ? `display: none;` : ``}
`
);

export { StyledAppendToBodyOptionsWrapper };
