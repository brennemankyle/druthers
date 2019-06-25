import styled from 'styled-components'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import RawContainer from '../Container/Container'


const Selection = styled(Item)`
  border-radius: .2em;
  align-items: center;
  justify-content: space-between;

  .remove {
    border: none;
    border-radius: .2em;
    background-color: transparent;
    padding: 0;
    font-size: 1em;

    img {
      width: 1em;
      vertical-align: middle;
    }

    &:hover {
      color: darkred;
      background-color: #CD5C5C;
    }
  }

  ${props => props.multiple
    ? `
      display: inline-flex;
      background-color: lightgray;
      margin-right: .2em;
      padding-left: .2em;
      .remove {
        padding: 0 .2em;
      }`
    : `
      display: flex;`
  }
`

const Option = styled(Item)`
  padding: .25em;

  &:hover {
    background-color: lightblue;
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
  border: 1px solid gray;
`

const Search = styled(RawSearch)`
  border: none;
  outline: none;
  width: 10em;
  font-size: 1em;
`

const Container = styled(RawContainer)`
  border: 1px solid gray;
  border-radius: .2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .25em;

  & > *:nth-last-child(3) {
    flex-grow: 1;
  }

  ${props => props.hasOptions
    ? `
      .divider {
        width: 1px;
        align-self: stretch;
        background-color: black;
        margin: 0 .4em;
      }

      .expand {
        width: 1em;
        vertical-align: middle;
      }`
    : `
      .divider {
        display: none;
      }

      .expand {
        display: none;
      }`
  }
`

export {
  Selection,
  SelectionList,
  OptionList,
  Option,
  Search,
  Container,
}
