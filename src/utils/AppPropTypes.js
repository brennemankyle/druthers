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
    fontSize: PropTypes.string.isRequired,
    borderRadius: PropTypes.string.isRequired,
    paddingTop: PropTypes.string.isRequired,
    paddingBottom: PropTypes.string.isRequired,
    paddingLeft: PropTypes.string.isRequired,
    paddingRight: PropTypes.string.isRequired,
    selection: PropTypes.shape({
      paddingTop: PropTypes.string.isRequired,
      paddingBottom: PropTypes.string.isRequired,
      paddingLeft: PropTypes.string.isRequired,
      paddingRight: PropTypes.string.isRequired,
    }).isRequired,
    option: PropTypes.shape({
      paddingTop: PropTypes.string.isRequired,
      paddingBottom: PropTypes.string.isRequired,
      paddingLeft: PropTypes.string.isRequired,
      paddingRight: PropTypes.string.isRequired,
    }).isRequired,
    search: PropTypes.shape({
      width: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.shape({
      width: PropTypes.string.isRequired,
    }).isRequired,
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      warning: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
    }).isRequired,
  })
}

export default AppPropTypes
