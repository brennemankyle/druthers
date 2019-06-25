import styled from 'styled-components'
import Item from '../Item/Item'
import ItemList from '../ItemList/ItemList'
import RawSearch from '../Search/Search'
import RawContainer from '../Container/Container'


const Selection = styled(Item)`
  display: inline-flex;
  width: ${props => props.multiple ? 'auto' : '100%'};
  background-color: lightgray;
  margin: .1em;

  .remove {
    border: none;
    background-color: transparent;

    &:hover {
      color: darkred;
      background-color: #CD5C5C;
    }
  }
`

const Option = styled(Item)`
  &:hover {
    background-color: lightblue;
  }
`

const SelectionList = styled(ItemList)`
  display: inline;
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
`

export {
  Selection,
  SelectionList,
  OptionList,
  Option,
  Search,
  Container,
}
