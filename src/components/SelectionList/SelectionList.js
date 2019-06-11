import React from 'react'
import PropTypes from 'prop-types'

let SelectionList = (props) => {
  let { Selection } = props.components

  return <ul
    tabIndex={props.onFocus && '0'}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onMouseDown={props.onClick}>
      { props.selection.length
        ? props.selection.map((item) => <Selection selectionItem={item} key={item.value} />)
        : props.placeholder}</ul>
}

SelectionList.defaultProps = {
  placeholder: '',
}

SelectionList.propTypes = {
  selection: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  components: PropTypes.shape({
    Selection: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default SelectionList
