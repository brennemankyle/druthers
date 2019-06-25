import PropTypes from 'prop-types'

let item = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

let rawValue = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.bool.isRequired,
  PropTypes.number.isRequired
])

let rawItem = PropTypes.shape({
  value: rawValue.isRequired,
  label: rawValue.isRequired,
})

let AppPropTypes = {
  item: item,
  itemList: PropTypes.arrayOf(item),
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.shape({current: PropTypes.element})]),
  rawValue: rawValue,
  rawItem: rawItem,
  rawItemList: PropTypes.arrayOf(rawItem),
  styles: PropTypes.shape({
    colors: PropTypes.object.isRequired,
  })
}

export default AppPropTypes
