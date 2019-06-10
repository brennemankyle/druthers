import React from 'react'
import HtmlFieldData from '../HtmlFieldData/HtmlFieldData'
import Selected from '../Selected/Selected'
import Options from '../Options/Options'
import Option from '../Option/Option'
import PropTypes from 'prop-types'

let Takey = (props) => {
  return [
    <props.components.HtmlFieldData name={props.name} selected={props.selected} key='HtmlFieldData' />,
    <props.components.Selected selected={props.selected} key='Selected' />,
    <props.components.Options options={props.options} key='Options' components={{Option: props.components.Option}} />,
  ]
}

Takey.defaultProps = {
  name: '',
  selected: [],
  components: {
    HtmlFieldData: HtmlFieldData,
    Selected: Selected,
    Options: Options,
    Option: Option,
  },
}

Takey.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.array,
  components: PropTypes.shape({
    HtmlFieldData: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Selected: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Options: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Option: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
}

export default Takey
