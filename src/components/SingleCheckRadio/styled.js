import styled from "@emotion/styled";
import SingleCheckRadio from "./SingleCheckRadio";

const CheckBox = styled(SingleCheckRadio)`
  margin-right: ${props => props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  ${props =>
    props.disabled
      ? `&& .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
      : `&:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`}

  .check-radio-display {
    border-radius: ${props => props.styles_borderRadius};
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    border: ${props => props.styles_checkRadio_borderWidth} solid
      ${props => props.styles_colors_secondary};
    width: ${props => props.styles_icon_width};
    height: ${props => props.styles_icon_width};
    background-color: ${props =>
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background};

    svg {
      fill: ${props => props.styles_colors_primary};
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
      ${props => !props.checked && `visibility: hidden;`}
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`;

const Radio = styled(SingleCheckRadio)`
  margin-right: ${props => props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  ${props =>
    props.disabled
      ? `&& .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
      : `&:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`}

  .check-radio-display {
    border-radius: 100%;
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    background-size: 0.1em;
    border: ${props => props.styles_checkRadio_borderWidth} solid
      ${props => props.styles_colors_secondary};
    width: ${props => props.styles_icon_width};
    height: ${props => props.styles_icon_width};
    background-color: ${props =>
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background};
    ${props =>
      props.checked && `background-color: ${props.styles_colors_secondary};`}

    svg {
      visibility: hidden;
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`;

const Switch = styled(SingleCheckRadio)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  ${props =>
    props.disabled
      ? `&& .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
      : `&:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`}

  .check-radio-display {
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    display: inline-flex;
    align-items: center;
    border-radius: 1em;
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    border: ${props => props.styles_checkRadio_borderWidth} solid
      ${props => props.styles_colors_secondary};
    width: calc(${props => props.styles_icon_width} * 2);
    height: ${props => props.styles_icon_width};
    background-color: ${props =>
      props.disabled
        ? props.styles_colors_disabled
        : props.styles_colors_background};

    svg {
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
      border-radius: 100%;
      ${props =>
        props.checked
          ? `margin-left: ${props.styles_icon_width};
          background-color: ${props.styles_colors_primary};`
          : `background-color: ${props.styles_colors_secondary};`}
      fill-opacity: 0;
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`;

export { CheckBox, Radio, Switch };
