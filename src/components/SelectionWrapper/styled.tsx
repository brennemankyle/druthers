import React from "react";
import styled from "@emotion/styled";
import RawSelectionWrapper from "./SelectionWrapper";

const SelectionWrapper = styled(RawSelectionWrapper)(
  (props) => `
  border: 1px solid ${props.styles_colors_secondary};
  border-radius: ${props.styles_borderRadius};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props.styles_paddingTop};
  padding-bottom: ${props.styles_paddingBottom};
  padding-right: ${props.styles_paddingRight};
  padding-left: ${props.styles_paddingLeft};
  & > div:first-of-type {
    flex-grow: 1;
    flex-shrink: 1;
  }
  & > * {
    flex-shrink: 0;
  }

  svg.expand {
    fill: ${props.styles_colors_primary};
  }

  ${
    !props.styles_disabled
      ? `&:hover {
          border-color: ${props.styles_colors_primary};
        }`
      : ``
  }

  ${
    props.areOptionsOpen
      ? `svg.expand {
          transform: scaleY(-1);
        }
        border-color: ${props.styles_colors_primary};`
      : ``
  }

  ${
    props.styles_hasOptions && !props.styles_optionsAlwaysOpen
      ? `.divider {
          width: 1px;
          align-self: stretch;
          background-color: ${props.styles_colors_secondary};
          margin-top: calc(.2em - ${props.styles_paddingTop});
          margin-bottom: calc(.2em - ${props.styles_paddingBottom});
          margin-left: .4em;
          margin-right: .4em;
        }

        svg.expand {
          width: ${props.styles_icon_width};
          height: ${props.styles_icon_width};
          margin-top: -1px;
          ${
            !props.styles_disabled
              ? `&:hover {
                  opacity: 0.5;
                }`
              : ``
          }
        }`
      : `.divider {
        display: none;
      }

      .expand {
        display: none;
      }`
  }

  background-color: ${
    props.styles_disabled
      ? props.styles_colors_disabled
      : props.styles_colors_background
  };
  ${props.styles_disabled ? `cursor: not-allowed;` : ``}
`
);

export { SelectionWrapper };
