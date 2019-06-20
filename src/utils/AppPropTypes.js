import PropTypes from 'prop-types'

let item = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

let AppPropTypes = {
  item: item,
  itemList: PropTypes.arrayOf(item),
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
}

export default AppPropTypes
