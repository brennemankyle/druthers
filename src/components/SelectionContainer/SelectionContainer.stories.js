import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from '../../mocks'
import props from '../../utils/defaultProps'
import { SelectionContainer, SelectionList, Search, Selection } from '../styledComponents/styledComponents'

let showSelection = true
let showSearch = true
let areOptionsOpen = false
let searchText = ''

storiesOf('(Internal) SelectionContainer', module)
  .add('with text', () => <SelectionContainer
    onFocus={action('onFocus')}
    onBlur={action('onBlur')}
    styles={mockStyles}
    areOptionsOpen={areOptionsOpen}
    SelectionList={
      showSelection && <SelectionList
        itemList={props.selection}
        onClick={action('onRemove')}
        removable={!props.disabled && props.removable}
        Item={Selection}
        styles={mockStyles} />
    }
    Search={
      <Search
        hide={!showSearch}
        placeholder={props.placeholder}
        searchText={searchText}
        onKeyDown={action('onKeyDown')}
        onChange={action('onChange')}
        styles={mockStyles} />
    } />)
