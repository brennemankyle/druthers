import styled from 'styled-components'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import RawSelectionContainer from '../SelectionContainer/SelectionContainer'
import { StyledAppendToBodyOptionsContainer as RawStyledAppendToBodyOptionsContainer } from '../AppendToBodyOptionsContainer/AppendToBodyOptionsContainer'
import Container from '../Container/Container'

const Selection = styled(Item)`
  border-radius: .2em;
  align-items: center;
  justify-content: space-between;

  .remove {
    border: none;
    border-radius: .2em;
    background-color: transparent;
    padding: 0 .2em;
    font-size: 1em;

    img {
      width: 1em;
      vertical-align: middle;
    }

    &:hover {
      background-color: ${props => props.styles.colors.warning};
    }
  }

  ${props => props.multiple
    ? `
      display: inline-flex;
      background-color: ${props.styles.colors.secondary};
      margin-right: .2em;
      padding-left: .2em;
      padding-right: ${props.removable ? '0' : '.2em'}`
    : `
      display: flex;`
  }
`

const Option = styled(Item)`
  padding: .25em;

  ${props => props.optionHighlighted === props.item.value
    ? `background-color: ${props.styles.colors.highlight};`
    : ``
  }
`

const SelectionList = styled(ItemList)`
  display: ${props => props.multiple ? 'inline' : 'block' };
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
  outline: none;
  padding: 0;
  width: 10em;
  font-size: 1em;
  font-family: inherit;
  background-color: transparent;
`

const SelectionContainer = styled(RawSelectionContainer)`
  border: 1px solid ${props => props.styles.colors.secondary};
  border-radius: .2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .25em;

  ${props => !props.disabled && `
    &:hover {
      border-color: ${props.styles.colors.primary};
    }`
  }

  ${props => props.areOptionsOpen && `
    img {
      transform: scaleY(-1);
    }
    border-color: ${props.styles.colors.primary};`}

  ${props => !props.multiple && !props.areOptionsOpen && props.hasSelection
    ? `
      & > *:nth-last-child(4) {
        flex-grow: 1;
      }
    ` : `
      & > *:nth-last-child(3) {
        flex-grow: 1;
      }
    `
  }

  ${props => props.hasOptions
    ? `
      .divider {
        width: 1px;
        align-self: stretch;
        background-color: ${props.styles.colors.secondary};
        margin: 0 .4em;
      }

      .expand {
        width: 1em;
        vertical-align: middle;

        ${!props.disabled && `
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

  ${props => props.disabled && `
    background-color: ${props.styles.colors.disabled}`
  }
`

const DivRelative = styled.div`
  position: relative
`

const OptionContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.styles.colors.background};
  width: ${props => props.styles.width}px;
`

const StyledAppendToBodyOptionsContainer = styled(RawStyledAppendToBodyOptionsContainer)`
  position: absolute;
  background-color: ${props => props.styles.colors.background};
  width: ${props => props.styles.width}px;

  ${props => props.placeOptionsAbove ? `
      top: ${props.parentRect.y - props.optionContainerRect.height}px;
      left: ${props.parentRect.x}px;
    ` : `
      top: ${props.parentRect.y + props.parentRect.height}px;
      left: ${props.parentRect.x}px;
    `}
`

export {
  DivRelative,
  Selection,
  SelectionList,
  OptionList,
  Option,
  Search,
  SelectionContainer,
  OptionContainer,
  StyledAppendToBodyOptionsContainer,
}
