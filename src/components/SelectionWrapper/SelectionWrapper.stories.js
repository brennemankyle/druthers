import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from '../../mocks'
import props from '../../utils/defaultProps'
import { SelectionWrapper, SelectionList, Search, Selection } from '../styledComponents/styledComponents'

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

storiesOf('(Internal) SelectionWrapper', module)
  .add('closed', () => <SelectionWrapper
    onFocus={action('onFocus')}
    onBlur={action('onBlur')}
    styles={mockStyles}
    areOptionsOpen={false}
    SelectionList={selectionList}
    Search={search} />)

storiesOf('(Internal) SelectionWrapper', module)
  .add('open', () => <SelectionWrapper
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
storiesOf('(Internal) SelectionWrapper', module)
  .add('disabled', () => <SelectionWrapper
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
