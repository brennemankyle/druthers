import React from "react";
import styled from "@emotion/styled";
import Item from "./Item";

const Selection = styled(Item)(
  (props) => `
  color: ${props.styles_colors_text}
  border-radius: ${props.styles_borderRadius};
  align-items: center;
  justify-content: space-between;
  margin-top: calc(${props.styles_selection_margin} / 2);
  margin-bottom: calc(${props.styles_selection_margin} / 2);
  padding-top: ${props.styles_selection_paddingTop};
  padding-bottom: ${props.styles_selection_paddingBottom};
  padding-left: ${props.styles_selection_paddingLeft};
  padding-right: ${props.removable ? "0" : props.styles_selection_paddingRight};

  & .remove:not(svg):not(path) {
    display: flex;
    border: none;
    border-radius: ${props.styles_borderRadius};
    margin-top: -${props.styles_selection_paddingTop};
    margin-bottom: -${props.styles_selection_paddingBottom};
    padding-top: ${props.styles_selection_paddingTop};
    padding-bottom: ${props.styles_selection_paddingBottom};
    padding-left: ${props.styles_selection_paddingLeft};
    padding-right: ${props.styles_selection_paddingRight};
    background-color: transparent;
    font-size: 1em;

    svg {
      fill: ${props.styles_colors_primary};
      width: ${props.styles_icon_width};
      height: ${props.styles_icon_width};
    }

    ${
      props.styles_selectionHighlighted === props.item.value
        ? `background-color: ${props.styles_colors_warning};

      svg {
        fill: ${props.styles_colors_warningBold};
      }`
        : ``
    }
  }

  ${
    props.styles_multiple
      ? `display: inline-flex;
        background-color: ${props.styles_colors_secondary};
        margin-right: ${props.styles_selection_margin};`
      : `display: flex;`
  }
  ${
    props.styles_rightToLeft
      ? `
        transform: scaleX(-1);
        flex-direction: row-reverse;
        padding-left: ${
          props.removable ? "0" : props.styles_selection_paddingRight
        };
        padding-right: ${props.styles_selection_paddingLeft};`
      : ``
  }
`
);

const Option = styled(Item)(
  (props) => `
  color: ${props.styles_colors_text}
  padding-top: ${props.styles_option_paddingTop};
  padding-bottom: ${props.styles_option_paddingBottom};
  padding-right: ${props.styles_option_paddingRight};
  padding-left: ${props.styles_option_paddingLeft};
  &:first-of-type{
    border-top-left-radius: ${props.styles_borderRadius};
    border-top-right-radius: ${props.styles_borderRadius};
  }
  &:last-of-type{
    border-bottom-left-radius: ${props.styles_borderRadius};
    border-bottom-right-radius: ${props.styles_borderRadius};
  }
  z-index: 999;

  ${
    props.styles_optionHighlighted != null &&
    props.styles_optionHighlighted === props.item.value
      ? `background-color: ${props.styles_colors_highlight};`
      : ``
  }
  ${
    props.styles_rightToLeft
      ? `transform: scaleX(-1);
        text-align: right;`
      : ``
  }
  ${
    props.item.childGroup && props.item.value == null
      ? `color: ${props.styles_colors_secondary};
        font-size: .8em;`
      : ``
  }
  ${
    props.item.childGroup && props.item.value != null
      ? `font-weight: bold;`
      : ``
  }
  ${
    props.item.group
      ? `margin-left: ${props.item.group.split(".").length * 2}em;`
      : ``
  }
`
);

export { Selection, Option };
