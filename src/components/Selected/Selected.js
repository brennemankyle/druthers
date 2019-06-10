import React from 'react'
import PropTypes from 'prop-types'

let Selected = (props) => {
  return <div>{props.selected.join(', ')}</div>
}

Selected.defaultProps = {
  selected: [],
}

Selected.propTypes = {
  selected: PropTypes.array,
}

export default Selected
