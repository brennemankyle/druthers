import React from 'react'
import PropTypes from 'prop-types'
import InternalTakey from '../InternalTakey/InternalTakey'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selection, { styleSelection } from '../Selection/Selection'
import SelectionList, { styleSelectionList } from '../SelectionList/SelectionList'
import Options, { styleOptions } from '../Options/Options'
import Option, { styleOption } from '../Option/Option'
import Search, { styleSearch } from '../Search/Search'
import castArray from 'lodash/castArray'
import filterOptions from '../../utils/filterOptions'
import styled from 'styled-components'

let Takey = (props) => {
  let {selection, options, ...otherProps} = props

  // Stringify
  selection = castArray(selection).map((value) => String(value))
  options = options.map((option) => ({value: String(option.value), label: String(option.label)}))

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
  placeholder: '...pick',
  multiple: false,
  creatable: false,

  maxSelectionCount: -1,
  minSelectionCount: -1,
  removeSelection: true,
  searchOptions: true,
  searchPlaceholder: '...search',
  filterOptions: filterOptions,
  noOptionsFound: 'No Options Found',

  components: {
    HtmlFieldData: HtmlFieldData,
    Selection: styled(Selection)`${styleSelection}`,
    SelectionList: styled(SelectionList)`${styleSelectionList}`,
    Options: styled(Options)`${styleOptions}`,
    Option: styled(Option)`${styleOption}`,
    Search: styled(Search)`${styleSearch}`,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selection: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
    PropTypes.number.isRequired,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
      PropTypes.number.isRequired,
    ])),
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  creatable: PropTypes.bool,

  maxSelectionCount: PropTypes.number,
  minSelectionCount: PropTypes.number,
  removeSelection: PropTypes.bool,
  searchOptions: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  filterOptions: PropTypes.func,
  noOptionsFound: PropTypes.string,

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
    SelectionList: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
  }),
}

export default Takey
