import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'
import styled from 'styled-components'
import InternalTakey from '../InternalTakey/InternalTakey'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Item, { styleSelection, styleOption } from '../Item/Item'
import ItemList, { styleSelectionList, styleOptions } from '../ItemList/ItemList'
import Search, { styleSearch } from '../Search/Search'
import Container, { styleContainer } from '../Container/Container'
import castArray from 'lodash/castArray'
import filterOptions from '../../utils/filterOptions'

let Takey = (props) => {
  let {selection, options, ...otherProps} = props

  // Stringify
  selection = castArray(selection).map((value) => String(value))
  options = options.map((option) => ({value: String(option[props.optionKeys[0]]), label: String(option[props.optionKeys[1]])}))

  // Objectify
  let massagedSelection = selection.map((value) => {
    let option = options.find((option) => option.value === value)

    return option == null ? {value: value, label: value} : option
  })

  return <InternalTakey
    selection={massagedSelection}
    options={options}
    {...otherProps} />
}

Takey.defaultProps = {
  name: '',
  selection: [],
  options: [],
  placeholder: 'Select...',
  multiple: false,
  creatable: false,

  maxSelectionCount: -1,
  minSelectionCount: -1,
  removeSelection: true,
  searchOptions: true,
  noOptionsFound: 'No Options Found',
  filterOptions: filterOptions,
  optionKeys: ['value', 'label'],

  components: {
    HtmlFieldData: HtmlFieldData,
    Selection: styled(Item)`${styleSelection}`,
    SelectionList: styled(ItemList)`${styleSelectionList}`,
    OptionList: styled(ItemList)`${styleOptions}`,
    Option: styled(Item)`${styleOption}`,
    Search: styled(Search)`${styleSearch}`,
    Container: styled(Container)`${styleContainer}`,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selection: PropTypes.oneOfType([
    AppPropTypes.rawValue,
    PropTypes.arrayOf(AppPropTypes.rawValue),
  ]),
  options: AppPropTypes.rawItemList,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  creatable: PropTypes.bool,

  maxSelectionCount: PropTypes.number,
  minSelectionCount: PropTypes.number,
  removeSelection: PropTypes.bool,
  searchOptions: PropTypes.bool,
  noOptionsFound: PropTypes.string,
  filterOptions: PropTypes.func,
  optionKeys: PropTypes.arrayOf(PropTypes.string),

  components: PropTypes.shape({
    HtmlFieldData: AppPropTypes.element,
    Item: AppPropTypes.element,
    SelectionList: AppPropTypes.element,
    OptionList: AppPropTypes.element,
    Option: AppPropTypes.element,
    Search: AppPropTypes.element,
    Container: AppPropTypes.element,
  }),
}

export default Takey
