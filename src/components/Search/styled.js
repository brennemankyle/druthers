import styled from "@emotion/styled";
import RawSearch from "./Search";

const Search = styled(RawSearch)`
  border: none;
  outline: 0;
  font-size: 1em;
  font-family: inherit;
  background-color: transparent;
  &::-ms-clear {
    display: none;
  }
  margin-top: calc(${props => props.styles_selection_margin} / 2);
  margin-bottom: calc(${props => props.styles_selection_margin} / 2);
  padding-top: ${props => props.styles_selection_paddingTop};
  padding-bottom: ${props => props.styles_selection_paddingBottom};
  padding-right: ${props => props.styles_selection_paddingRight};
  padding-left: ${props => props.styles_selection_paddingLeft};
  ${props =>
    props.styles_rightToLeft &&
    `transform: scaleX(-1);
    text-align: right;`}
  ${props =>
    props.hide &&
    `opacity: 0;
    width: 0;
    padding: 0;
    margin: 0;`}
  ${props => props.styles_disabled && `cursor: not-allowed;`}
`;

export { Search };
