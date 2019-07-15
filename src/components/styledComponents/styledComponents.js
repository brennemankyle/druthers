import styled from 'styled-components'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import InternalCheckRadio from '../InternalCheckRadio/InternalCheckRadio'
import RawSelectionWrapper from '../SelectionWrapper/SelectionWrapper'
import { StyledAppendToBodyOptionsWrapper as RawStyledAppendToBodyOptionsWrapper } from '../AppendToBodyOptionsWrapper/AppendToBodyOptionsWrapper'
import RawWrapper from '../Wrapper/Wrapper'

const Wrapper = styled(RawWrapper)`
  font-size: ${props => props.styles.fontSize};
  ${props => props.styles.rightToLeft && `
    transform: scaleX(-1);`
  }
`

const Selection = styled(Item)`
  border-radius: ${props => props.styles.borderRadius};
  align-items: center;
  justify-content: space-between;

  .remove {
    border: none;
    border-radius: ${props => props.styles.borderRadius};
    background-color: transparent;
    padding-top: ${props => props.styles.selection.paddingTop};
    padding-bottom: ${props => props.styles.selection.paddingBottom};
    padding-right: ${props => props.styles.selection.paddingRight};
    padding-left: ${props => props.styles.selection.paddingLeft};
    font-size: 1em;

    img {
      width: ${props => props.styles.icon.width};
    }

    &:hover {
      background-color: ${props => props.styles.colors.warning};
    }
  }

  ${props => props.styles.multiple
    ? `
      display: inline-flex;
      background-color: ${props.styles.colors.secondary};
      padding-top: ${props.styles.selection.paddingTop};
      padding-bottom: ${props.styles.selection.paddingBottom};
      margin-right: ${props.styles.selection.paddingRight};
      padding-left: ${props.styles.selection.paddingLeft};
      padding-right: ${props.removable ? '0' : props.styles.selection.paddingRight}
      .remove {
        img {
          vertical-align: text-bottom;
        }
      }`
    : `
      display: flex;
      .remove {
        img {
          vertical-align: middle;
        }
      }`
  }
  ${props => props.styles.rightToLeft && `
    transform: scaleX(-1);`
  }
`

const Option = styled(Item)`
  padding-top: ${props => props.styles.option.paddingTop};
  padding-bottom: ${props => props.styles.option.paddingBottom};
  padding-right: ${props => props.styles.option.paddingRight};
  padding-left: ${props => props.styles.option.paddingLeft};

  ${props => props.styles.optionHighlighted === props.item.value
    ? `background-color: ${props.styles.colors.highlight};`
    : ``
  }
  ${props => props.styles.rightToLeft && `
    transform: scaleX(-1);
    text-align: right;`
  }
`

const SelectionList = styled(ItemList)`
  display: ${props => props.styles.multiple ? 'inline' : 'block' };
  list-style-type: none;
  padding: 0;
  margin: 0;
`
const OptionList = styled(ItemList)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${props => props.styles.colors.secondary};
`

const Search = styled(RawSearch)`
  border: none;
  outline: 0;
  padding: 0;
  font-size: 1em;
  font-family: inherit;
  background-color: transparent;
  ${props => props.styles.rightToLeft && `
    transform: scaleX(-1);
    text-align: right;`
  }
  ${props => props.hide
    ? `
      opacity: 0;
      width: 0;`
    : `
      width: ${props.styles.search.width};`
  }
`

const CheckBox = styled(InternalCheckRadio)`
  margin-right: 1em;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  ${props => !props.disabled && `
    &:hover .check-radio-display {
      border-color: ${props.styles.colors.primary};
    }`
  }

  .check-radio-display {
    border-radius: ${props => props.styles.borderRadius};
    margin-right: .2em;
    padding: .2em;
    border: 1px solid ${props => props.styles.colors.secondary};
    width: ${props => props.styles.icon.width};
    height: ${props => props.styles.icon.width};

    img {
      width: ${props => props.styles.icon.width};
      ${props => !props.checked && `
        visibility: hidden;`
      }
    }
  }

  input {
    display: none;
  }
`

const Radio = styled(InternalCheckRadio)`
  margin-right: 1em;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  ${props => !props.disabled && `
    &:hover .check-radio-display {
      border-color: ${props.styles.colors.primary};
    }`
  }

  .check-radio-display {
    border-radius: 100%;
    margin-right: .2em;
    padding: .2em;
    background-size: .1em;
    border: 1px solid ${props => props.styles.colors.secondary};
    width: ${props => props.styles.icon.width};
    height: ${props => props.styles.icon.width};
    ${props => props.checked && `
      background-color: ${props.styles.colors.secondary};`
    }

    img {
      visibility: hidden;
      width: ${props => props.styles.icon.width};
    }
  }

  input {
    display: none;
  }
`

const Switch = styled(InternalCheckRadio)`
  cursor: pointer;
  ${props => !props.disabled && `
    &:hover .check-radio-display {
      border-color: ${props.styles.colors.primary};
    }`
  }

  .check-radio-display {
    display: inline-flex;
    align-items: center;
    border-radius: 1em;
    padding: .2em;
    border: 1px solid ${props => props.styles.colors.secondary};
    width: calc(${props => props.styles.icon.width} * 2);
    height: ${props => props.styles.icon.width};

    img {
      width: ${props => props.styles.icon.width};
      border-radius: 100%;
      ${props => props.checked
        ? `
          margin-left: ${props.styles.icon.width};
          background-color: ${props.styles.colors.primary};`
        : `
          background-color: ${props.styles.colors.secondary};`
      }
      object-position: -99999px 99999px;
    }
  }

  input {
    display: none;
  }
`

const SelectionWrapper = styled(RawSelectionWrapper)`
  border: 1px solid ${props => props.styles.colors.secondary};
  border-radius: ${props => props.styles.borderRadius};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.styles.paddingTop};
  padding-bottom: ${props => props.styles.paddingBottom};
  padding-right: ${props => props.styles.paddingRight};
  padding-left: ${props => props.styles.paddingLeft};

  ${props => !props.styles.disabled && `
    &:hover {
      border-color: ${props.styles.colors.primary};
    }`
  }

  ${props => props.areOptionsOpen && `
    img {
      transform: scaleY(-1);
    }
    border-color: ${props.styles.colors.primary};`}

  ${props => !props.styles.multiple && !props.areOptionsOpen && props.styles.hasSelection
    ? `
      & > *:nth-last-child(4) {
        flex-grow: 1;
      }`
    : `
      & > *:nth-last-child(3) {
        flex-grow: 1;
      }`
  }

  ${props => props.styles.hasOptions
    ? `
      .divider {
        width: 1px;
        align-self: stretch;
        background-color: ${props.styles.colors.secondary};
        margin: 0 .4em;
      }

      .expand {
        width: ${props.styles.icon.width};
        vertical-align: middle;

        ${!props.styles.disabled && `
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

  ${props => props.styles.disabled && `
    background-color: ${props.styles.colors.disabled}`
  }
`

const DivRelative = styled.div`
  position: relative
`

const OptionWrapper = styled(RawWrapper)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.styles.colors.background};
  width: ${props => props.styles.width}px;
`

const StyledAppendToBodyOptionsWrapper = styled(RawStyledAppendToBodyOptionsWrapper)`
  position: absolute;
  background-color: ${props => props.styles.colors.background};
  width: ${props => props.styles.width}px;

  ${props => props.placeOptionsAbove ? `
      bottom: ${window.innerHeight - props.parentRect.y}px;
      left: ${props.parentRect.x}px;`
    : `
      top: ${props.parentRect.y + props.parentRect.height}px;
      left: ${props.parentRect.x}px;`
  }
  ${props => props.styles.rightToLeft && `
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
  OptionWrapper,
  StyledAppendToBodyOptionsWrapper,
  Wrapper,
  CheckBox,
  Radio,
  Switch,
}
