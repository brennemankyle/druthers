import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from '../../mocks'
import props from '../../utils/defaultProps'
import { SelectionContainer, SelectionList, Search, Selection } from '../styledComponents/styledComponents'

let selectionList = <SelectionList
  itemList={props.selection}
  onClick={action('onRemove')}
  removable={!props.disabled && props.removable}
  Item={Selection}
  styles={mockStyles} />
let search = <Search
  hide={false}
  placeholder={props.placeholder}
  searchText={''}
  onKeyDown={action('onKeyDown')}
  onChange={action('onChange')}
  styles={mockStyles} />

storiesOf('(Internal) SelectionContainer', module)
  .add('closed', () => <SelectionContainer
    onFocus={action('onFocus')}
    onBlur={action('onBlur')}
    styles={mockStyles}
    areOptionsOpen={false}
    SelectionList={selectionList}
    Search={search} />)

storiesOf('(Internal) SelectionContainer', module)
  .add('open', () => <SelectionContainer
    onFocus={action('onFocus')}
    onBlur={action('onBlur')}
    styles={mockStyles}
    areOptionsOpen={true}
    SelectionList={selectionList}
    Search={search} />)

let styles = {
  ...mockStyles,
  disabled: true,
}
storiesOf('(Internal) SelectionContainer', module)
  .add('disabled', () => <SelectionContainer
    onFocus={action('onFocus')}
    onBlur={action('onBlur')}
    styles={styles}
    areOptionsOpen={false}
    SelectionList={<SelectionList
      itemList={props.selection}
      onClick={action('onRemove')}
      removable={!props.disabled && props.removable}
      Item={Selection}
      styles={styles} />}
    Search={<Search
      placeholder={props.placeholder}
      searchText={''}
      onKeyDown={action('onKeyDown')}
      onChange={action('onChange')}
      styles={styles} />} />)
