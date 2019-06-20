import React from 'react'
import PropTypes from 'prop-types'
import AppPropTypes from '../../utils/AppPropTypes'

let HtmlFieldData = (props) => {
  return <input
    type="hidden"
    name={props.name}
    value={props.itemList.map((item) => item.value).join(',')} />
}

HtmlFieldData.propTypes = {
  name: PropTypes.string.isRequired,
  itemList: AppPropTypes.itemList.isRequired,
}

export default HtmlFieldData
