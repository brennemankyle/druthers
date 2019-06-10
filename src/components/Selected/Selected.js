import React from 'react'
import PropTypes from 'prop-types'

let Selected = (props) => {
  let Component = props.multiple ? props.components.MultipleSelected : props.components.SingleSelected

  return <Component {...props} />
}

Selected.propTypes = {
  selected: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  components: PropTypes.shape({
    SingleSelected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    MultipleSelected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  }).isRequired,
}

export default Selected
