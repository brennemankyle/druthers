import moveHighlighted from '../utils/moveHighlighted'

const mergeState = (state, merge) => {
  let newState = state

  Object.keys(merge).forEach((key) => {
    if (newState[key] !== merge[key]) newState = {...newState, [key]: merge[key]}
  })

  return newState
}

const reducer = (state, action) => {
  if (action.props == null) throw new Error('must always send props')

  const { areOptionsOpen, searchText, placeholder, optionHighlighted, selectionHighlighted, width, filteredOptions } = state
  const { type, props, payload } = action
  let newState = state

  switch (type) {
    case 'openOptions':
      newState = mergeState(newState, {areOptionsOpen: true})

      newState = reducer(newState, {props, type: 'setValidOptionHighlighted'})
      newState = reducer(newState, {props, type: 'updatePlaceholder'})

      return newState
    case 'closeOptions':
      if (areOptionsOpen) {
        newState = reducer(newState, {props, type: 'clearOptionHighlighted'})
        newState = reducer(newState, {props, type: 'clearSearchText'})
      }

      return mergeState(newState, {areOptionsOpen: false})
    case 'setSearchText':
      newState = mergeState(newState, {searchText: payload})

      if (searchText !== payload) {
        newState = reducer(newState, {props, type: 'filterOptions'})
      }

      return newState
    case 'clearSearchText':
      return reducer(newState, {props, type: 'setSearchText', payload: ''})
    case 'updatePlaceholder':
      let newPlaceholder = areOptionsOpen && !props.multiple && props.hasOptions && props.hasSelection
        ? props.selection[0].label // Set placeholder to current selection on single select
        : props.text_placeholder

      if (newState.placeholder !== newPlaceholder) {
        newState = mergeState(newState, {placeholder: newPlaceholder})
      }

      return newState
    case 'setWidth':
      const ref = payload

      return mergeState(newState, {width: ref && ref.current ? ref.current.offsetWidth : 0})
    case 'selectionUpdated':
      if (!props.hasSelection) {
        newState = reducer(newState, {props, type: 'clearSelectionHighlighted'})
      }

      newState = reducer(newState, {props, type: 'updatePlaceholder'})

      return reducer(newState, {props, type: 'filterOptions'})
    case 'clearOptionHighlighted':
      return mergeState(newState, {optionHighlighted: null})
    case 'clearSelectionHighlighted':
      return mergeState(newState, {selectionHighlighted: null})
    case 'setOptionHighlighted':
      if (payload == null) return newState
      if (!areOptionsOpen || !filteredOptions.length) return reducer(newState, {props, type: 'clearHighlighted'})

      return mergeState(newState, {
        optionHighlighted: payload,
        selectionHighlighted: null,
      })
    case 'setSelectionHighlighted':
      if (payload == null) return newState
      if (!props.hasSelection) return reducer(newState, {props, type: 'clearHighlighted'})

      return mergeState(newState, {
        selectionHighlighted: payload,
        optionHighlighted: null,
      })
    case 'clearHighlighted':
      return mergeState(newState, {
        selectionHighlighted: null,
        optionHighlighted: null,
      })
    case 'moveSelectionHighlighted': {
      return reducer(newState, {
        props,
        type: 'setSelectionHighlighted',
        payload: moveHighlighted(props.selection, payload, selectionHighlighted, true)
      })
    }
    case 'moveOptionHighlighted': {
      return reducer(newState, {
        props,
        type: 'setOptionHighlighted',
        payload: moveHighlighted(filteredOptions, payload, optionHighlighted)
      })
    }
    case 'setValidOptionHighlighted':
      if (!areOptionsOpen || selectionHighlighted != null || filteredOptions.map(option => option.value).filter(value => value != null).includes(optionHighlighted)) {
        return newState
      }

      return reducer(newState, {props, type: 'moveOptionHighlighted', payload: 0})
    case 'filterOptions':
      let newFilteredOptions = props.filterOptions(props, searchText)

      if (props.creatable && searchText && !newFilteredOptions.some(option => option.value === searchText)
        && (props.allowDuplicates || !props.selection.some(item => item.value === searchText))) // Don't allow duplicates
      {
        newFilteredOptions.push({value: searchText, label: props.text_create + ` "${searchText}"`}) // Add option for creatable
      }

      newState = mergeState(newState, {filteredOptions: newFilteredOptions})

      if (optionHighlighted == null) {
        newState = reducer(newState, {props, type: 'setValidOptionHighlighted'})
      } else if (!newFilteredOptions.length) {
        newState = reducer(newState, {props, type: 'clearOptionHighlighted'})
      }

      return newState
    default:
      throw new Error('action not found: ' + action.type)
  }
}

export default reducer
