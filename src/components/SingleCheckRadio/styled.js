import styled from "@emotion/styled";
import SingleCheckRadio from "./SingleCheckRadio";

const CheckBox = styled(SingleCheckRadio)(
  props => `
  margin-right: ${props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: ${props.disabled ? "not-allowed" : "pointer"};
  ${
    props.disabled
      ? `&& .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
      : `&:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`
  }

  .check-radio-display {
    border-radius: ${props.styles_borderRadius};
    margin-right: ${props.styles_checkRadio_labelMargin};
    padding-top: ${props.styles_checkRadio_paddingTop};
    padding-bottom: ${props.styles_checkRadio_paddingBottom};
    padding-right: ${props.styles_checkRadio_paddingRight};
    padding-left: ${props.styles_checkRadio_paddingLeft};
    border: ${props.styles_checkRadio_borderWidth} solid
      ${props.styles_colors_secondary};
    width: ${props.styles_icon_width};
    height: ${props.styles_icon_width};
    background-color: ${
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background
    };

    svg {
      fill: ${props.styles_colors_primary};
      width: ${props.styles_icon_width};
      height: ${props.styles_icon_width};
      ${!props.checked ? `visibility: hidden;` : ``}
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`
);

const Radio = styled(SingleCheckRadio)(
  props => `
  margin-right: ${props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props.disabled ? "not-allowed" : "pointer"};
  ${
    props.disabled
      ? `&& .check-radio-display {
          border-color: ${props.styles_colors_disabled};
        }`
      : `&:hover .check-radio-display {
          border-color: ${props.styles_colors_primary};
        }
        &.focus .check-radio-display {
          border-color: ${props.styles_colors_primary};
        }`
  }

  .check-radio-display {
    border-radius: 100%;
    margin-right: ${props.styles_checkRadio_labelMargin};
    padding-top: ${props.styles_checkRadio_paddingTop};
    padding-bottom: ${props.styles_checkRadio_paddingBottom};
    padding-right: ${props.styles_checkRadio_paddingRight};
    padding-left: ${props.styles_checkRadio_paddingLeft};
    background-size: 0.1em;
    border: ${props.styles_checkRadio_borderWidth} solid
      ${props.styles_colors_secondary};
    width: ${props.styles_icon_width};
    height: ${props.styles_icon_width};
    background-color: ${
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background
    };
    ${
      props.checked ? `background-color: ${props.styles_colors_secondary};` : ``
    }

    svg {
      visibility: hidden;
      width: ${props.styles_icon_width};
      height: ${props.styles_icon_width};
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`
);

const Switch = styled(SingleCheckRadio)(
  props => `
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props.disabled ? "not-allowed" : "pointer"};
  ${
    props.disabled
      ? `&& .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
      : `&:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`
  }

  .check-radio-display {
    margin-right: ${props.styles_checkRadio_labelMargin};
    display: inline-flex;
    align-items: center;
    border-radius: 1em;
    padding-top: ${props.styles_checkRadio_paddingTop};
    padding-bottom: ${props.styles_checkRadio_paddingBottom};
    padding-right: ${props.styles_checkRadio_paddingRight};
    padding-left: ${props.styles_checkRadio_paddingLeft};
    border: ${props.styles_checkRadio_borderWidth} solid
      ${props.styles_colors_secondary};
    width: calc(${props.styles_icon_width} * 2);
    height: ${props.styles_icon_width};
    background-color: ${
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background
    };

    svg {
      width: ${props.styles_icon_width};
      height: ${props.styles_icon_width};
      border-radius: 100%;
      ${
        props.checked
          ? `margin-left: ${props.styles_icon_width};
          background-color: ${props.styles_colors_primary};`
          : `background-color: ${props.styles_colors_secondary};`
      }
      fill-opacity: 0;
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`
);

export { CheckBox, Radio, Switch };
