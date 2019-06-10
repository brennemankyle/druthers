import React, { useState } from 'react'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selected from '../Selected/Selected'
import SingleSelected from '../SingleSelected/SingleSelected'
import MultipleSelected from '../MultipleSelected/MultipleSelected'
import Options from '../Options/Options'
import Option from '../Option/Option'
import Search from '../Search/Search'
import PropTypes from 'prop-types'

let Takey = (props) => {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)

  let {
    HtmlFieldData,
    Selected,
    Options,
    SingleSelected,
    MultipleSelected,
    Option,
    Search,
  } = props.components

  return [
    <HtmlFieldData
      name={props.name}
      selected={props.selected}
      key='HtmlFieldData' />,
    <Selected
      selected={props.selected}
      placeholder={props.placeholder}
      multiple={props.multiple}
      searchText={props.searchText}
      onFocus={() => setAreOptionsOpen(true)}
      onBlur={() => setAreOptionsOpen(false)}
      key='Selected'
      components={{
        SingleSelected,
        MultipleSelected,
        Search,
      }} />,
    <Options
      options={props.options}
      multiple={props.multiple}
      areOptionsOpen={areOptionsOpen}
      searchText={props.searchText}
      key='Options'
      components={{
        Option,
        Search,
      }} />,
  ]
}

Takey.defaultProps = {
  name: '',
  selected: [],
  options: [],
  placeholder: '',
  multiple: false,
  creatable: false,

  maxSelectedCount: -1,
  minSelectedCount: -1,
  removeSelected: true,
  searchOptions: true,
  searchText: '...search',

  components: {
    HtmlFieldData: HtmlFieldData,
    Selected: Selected,
    SingleSelected: SingleSelected,
    MultipleSelected: MultipleSelected,
    Options: Options,
    Option: Option,
    Search: Search,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.array,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  creatable: PropTypes.bool,

  maxSelectedCount: PropTypes.number,
  minSelectedCount: PropTypes.number,
  removeSelected: PropTypes.bool,
  searchOptions: PropTypes.bool,

  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Selected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    SingleSelected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    MultipleSelected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
}

export default Takey
