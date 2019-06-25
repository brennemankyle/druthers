import styled from 'styled-components'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import RawContainer from '../Container/Container'


const Selection = styled(Item)`
  margin: .1em;

  .remove {
    border: none;
    background-color: transparent;

    &:hover {
      color: darkred;
      background-color: #CD5C5C;
    }
  }

  ${props => props.multiple
    ? `
      display: inline;
      background-color: lightgray;`
    : `
      display: flex;
      flex-grow: 1;
      justify-content: space-between;`
  }
`

const Option = styled(Item)`
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
  display: flex;
  justify-content: space-between;

  & > *:last-child {
    flex-grow: 1;
  }

  &:after {
    content: "v";
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
