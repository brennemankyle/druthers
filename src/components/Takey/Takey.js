import React from 'react'
import PropTypes from 'prop-types'
import InternalTakey from '../InternalTakey/InternalTakey'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selection from '../Selection/Selection'
import SelectionList from '../SelectionList/SelectionList'
import Options from '../Options/Options'
import Option from '../Option/Option'
import Search from '../Search/Search'
import castArray from 'lodash/castArray'

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
  placeholder: '',
  multiple: false,
  creatable: false,

  maxSelectionCount: -1,
  minSelectionCount: -1,
  removeSelection: true,
  searchOptions: true,
  searchPlaceholder: '...search',

  components: {
    HtmlFieldData: HtmlFieldData,
    Selection: Selection,
    SelectionList: SelectionList,
    Options: Options,
    Option: Option,
    Search: Search,
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

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    SelectionList: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
}

export default Takey
