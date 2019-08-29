import styled from '@emotion/styled'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import InternalCheckRadio from '../InternalCheckRadio/InternalCheckRadio'
import RawSelectionWrapper from '../SelectionWrapper/SelectionWrapper'
import { StyledAppendToBodyOptionsWrapper as RawStyledAppendToBodyOptionsWrapper } from '../AppendToBodyOptionsWrapper/AppendToBodyOptionsWrapper'
import RawWrapper from '../Wrapper/Wrapper'

const Wrapper = styled(RawWrapper)`
  font-size: ${props => props.styles_fontSize};
  ${props => props.styles_rightToLeft && `
    transform: scaleX(-1);`
  }
`

const Selection = styled(Item)`
  border-radius: ${props => props.styles_borderRadius};
  align-items: center;
  justify-content: space-between;
  margin-top: calc(${props => props.styles_selection_margin} / 2);
  margin-bottom: calc(${props => props.styles_selection_margin} / 2);
  padding-top: ${props => props.styles_selection_paddingTop};
  padding-bottom: ${props => props.styles_selection_paddingBottom};
  padding-left: ${props => props.styles_selection_paddingLeft};
  padding-right: ${props => props.removable ? '0' : props.styles_selection_paddingRight};

  & .remove:not(svg):not(path) {
    display: flex;
    border: none;
    border-radius: ${props => props.styles_borderRadius};
    margin-top: -${props => props.styles_selection_paddingTop};
    margin-bottom: -${props => props.styles_selection_paddingBottom};
    padding-top: ${props => props.styles_selection_paddingTop};
    padding-bottom: ${props => props.styles_selection_paddingBottom};
    padding-left: ${props => props.styles_selection_paddingLeft};
    padding-right: ${props => props.styles_selection_paddingRight};
    background-color: transparent;
    font-size: 1em;

    svg {
      fill: ${props => props.styles_colors_primary};
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
    }

    ${props => props.styles_selectionHighlighted === props.item.value && `
      background-color: ${props.styles_colors_warning};

      svg {
        fill: ${props.styles_colors_warningBold};
      }`
    }
  }

  ${props => props.styles_multiple
    ? `
      display: inline-flex;
      background-color: ${props.styles_colors_secondary};
      margin-right: ${props.styles_selection_margin};`
    : `
      display: flex;`
  }
  ${props => props.styles_rightToLeft && `
    transform: scaleX(-1);
    flex-direction: row-reverse;
    padding-left: ${props.removable ? '0' : props.styles_selection_paddingRight};
    padding-right: ${props.styles_selection_paddingLeft};`
  }
`

const Option = styled(Item)`
  padding-top: ${props => props.styles_option_paddingTop};
  padding-bottom: ${props => props.styles_option_paddingBottom};
  padding-right: ${props => props.styles_option_paddingRight};
  padding-left: ${props => props.styles_option_paddingLeft};

  ${props => props.styles_optionHighlighted === props.item.value && `
    background-color: ${props.styles_colors_highlight};`
  }
  ${props => props.styles_rightToLeft && `
    transform: scaleX(-1);
    text-align: right;`
  }
`

const SelectionList = styled(ItemList)`
  ${props => props.styles_multiple
    ? `
      display: inline;`
    : `
      display: inline-block;
      &:not(:empty) {
        width: 100%;
      }`
  }
  list-style-type: none;
  padding: 0;
  margin: 0;
`
const OptionList = styled(ItemList)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${props => props.styles_colors_secondary};
`

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
  ${props => props.styles_rightToLeft && `
    transform: scaleX(-1);
    text-align: right;`
  }
  ${props => props.hide
    ? `
      opacity: 0;
      width: 0;
      padding: 0;
      margin: 0;`
    : `
      width: ${props.styles_search_width};`
  }
  ${props => props.styles_disabled && `
    cursor: not-allowed;`
  }
`

const CheckBox = styled(InternalCheckRadio)`
  margin-right: ${props => props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${props => props.disabled
    ? `
      && .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
    : `
      &:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`
  }

  .check-radio-display {
    border-radius: ${props => props.styles_borderRadius};
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    border: ${props => props.styles_checkRadio_borderWidth} solid ${props => props.styles_colors_secondary};
    width: ${props => props.styles_icon_width};
    height: ${props => props.styles_icon_width};
    background-color: ${props => props.disabled ? props.styles_colors_disabled : props.styles_colors_background};

    svg {
      fill: ${props => props.styles_colors_primary};
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
      ${props => !props.checked && `
        visibility: hidden;`
      }
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`

const Radio = styled(InternalCheckRadio)`
  margin-right: ${props => props.styles_checkRadio_marginBetween};
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${props => props.disabled
    ? `
      && .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
    : `
      &:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`
  }

  .check-radio-display {
    border-radius: 100%;
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    background-size: .1em;
    border: ${props => props.styles_checkRadio_borderWidth} solid ${props => props.styles_colors_secondary};
    width: ${props => props.styles_icon_width};
    height: ${props => props.styles_icon_width};
    background-color: ${props => props.disabled ? props.styles_colors_disabled : props.styles_colors_background};
    ${props => props.checked && `
      background-color: ${props.styles_colors_secondary};`
    }

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
`

const Switch = styled(InternalCheckRadio)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${props => props.disabled
    ? `
      && .check-radio-display {
        border-color: ${props.styles_colors_disabled};
      }`
    : `
      &:hover .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }
      &.focus .check-radio-display {
        border-color: ${props.styles_colors_primary};
      }`
  }

  .check-radio-display {
    margin-right: ${props => props.styles_checkRadio_labelMargin};
    display: inline-flex;
    align-items: center;
    border-radius: 1em;
    padding-top: ${props => props.styles_checkRadio_paddingTop};
    padding-bottom: ${props => props.styles_checkRadio_paddingBottom};
    padding-right: ${props => props.styles_checkRadio_paddingRight};
    padding-left: ${props => props.styles_checkRadio_paddingLeft};
    border: ${props => props.styles_checkRadio_borderWidth} solid ${props => props.styles_colors_secondary};
    width: calc(${props => props.styles_icon_width} * 2);
    height: ${props => props.styles_icon_width};
    background-color: ${props => props.disabled ? props.styles_colors_disabled : props.styles_colors_background};

    svg {
      width: ${props => props.styles_icon_width};
      height: ${props => props.styles_icon_width};
      border-radius: 100%;
      ${props => props.checked
        ? `
          margin-left: ${props.styles_icon_width};
          background-color: ${props.styles_colors_primary};`
        : `
          background-color: ${props.styles_colors_secondary};`
      }
      fill-opacity: 0;
    }
  }

  input {
    opacity: 0;
    width: 0;
  }
`

const SelectionWrapper = styled(RawSelectionWrapper)`
  border: 1px solid ${props => props.styles_colors_secondary};
  border-radius: ${props => props.styles_borderRadius};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.styles_paddingTop};
  padding-bottom: ${props => props.styles_paddingBottom};
  padding-right: ${props => props.styles_paddingRight};
  padding-left: ${props => props.styles_paddingLeft};
  & > div:first-of-type {
    flex-grow: 1;
    flex-shrink: 1;
  }
  & > * {
    flex-shrink: 0;
  }

  svg.expand {
    fill: ${props => props.styles_colors_primary};
  }

  ${props => !props.styles_disabled && `
    &:hover {
      border-color: ${props.styles_colors_primary};
    }`
  }

  ${props => props.areOptionsOpen && `
    svg.expand {
      transform: scaleY(-1);
    }
    border-color: ${props.styles_colors_primary};`}

  ${props => props.styles_hasOptions
    ? `
      .divider {
        width: 1px;
        align-self: stretch;
        background-color: ${props.styles_colors_secondary};
        margin: 0 .4em;
      }

      svg.expand {
        width: ${props.styles_icon_width};
        height: ${props.styles_icon_width};
        margin-top: -1px;

        ${!props.styles_disabled && `
          &:hover {
            opacity: 0.5;
          }`
        }
      }`
    : `
      .divider {
        display: none;
      }

      .expand {
        display: none;
      }`
  }

  background-color: ${props => props.styles_disabled ? props.styles_colors_disabled : props.styles_colors_background};
  ${props => props.styles_disabled && `
    cursor: not-allowed;`
  }
`

const DivRelative = styled.div`
  position: relative
`

const OptionsWrapper = styled(RawWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props => props.styles_colors_background};
  width: ${props => props.styles_width}px;
`

const StyledAppendToBodyOptionsWrapper = styled(RawStyledAppendToBodyOptionsWrapper)`
  position: absolute;
  background-color: ${props => props.styles_colors_background};
  width: ${props => props.styles_width}px;

  ${props => props.placeOptionsAbove ? `
      bottom: ${window.innerHeight - props.parentRect.y}px;
      left: ${props.parentRect.x}px;`
    : `
      top: ${props.parentRect.y + props.parentRect.height}px;
      left: ${props.parentRect.x}px;`
  }
  ${props => props.styles_rightToLeft && `
    transform: scaleX(-1);`
  }
`

export {
  DivRelative,
  Selection,
  SelectionList,
  OptionList,
  Option,
  Search,
  SelectionWrapper,
  OptionsWrapper,
  StyledAppendToBodyOptionsWrapper,
  Wrapper,
  CheckBox,
  Radio,
  Switch,
}
