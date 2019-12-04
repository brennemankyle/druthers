import moveHighlighted from '../utils/moveHighlighted'

const mergeState = (state, merge) => {
  let newState = state

  Object.keys(merge).forEach((key) => {
    if (newState[key] !== merge[key]) newState = {...newState, [key]: merge[key]}
  })

  return newState
}

const reducer = (state, action) => {
  const { areOptionsOpen, searchText, placeholder, optionHighlighted, selectionHighlighted, width } = state
  const { type , payload } = action
  let newState = state

  switch (type) {
    case 'setAreOptionsOpen':
      return reducer(newState, {type: payload.areOptionsOpen ? 'openOptions' : 'closeOptions', payload: payload.filteredOptions})
    case 'openOptions':
      let filteredOptions = payload
      newState = mergeState(newState, {areOptionsOpen: true})

      if (!areOptionsOpen && selectionHighlighted == null && !filteredOptions.map(option => option.value).filter(value => value != null).includes(optionHighlighted)) {
        newState = reducer(newState, {type: 'moveOptionHighlighted', payload: {filteredOptions: filteredOptions, move: 0}})
      }

      return newState
    case 'closeOptions':
      newState = mergeState(newState, {areOptionsOpen: false})

      if (areOptionsOpen) {
        newState = reducer(newState, {type: 'clearOptionHighlighted'})
      }

      return newState
    case 'setSearchText':
      return mergeState(newState, {searchText: payload})
    case 'clearSearchText':
      return mergeState(newState, {searchText: ''})
    case 'setPlaceholder':
      return mergeState(newState, {placeholder: payload})
    case 'setWidth':
      return mergeState(newState, {width: payload})
    case 'clearOptionHighlighted':
      return mergeState(newState, {optionHighlighted: null})
    case 'clearSelectionHighlighted':
      return mergeState(newState, {selectionHighlighted: null})
    case 'setOptionHighlighted':
      if (payload == null) return newState
      if (!areOptionsOpen) return reducer(newState, {type: 'clearHighlighted'})

      return mergeState(newState, {
        optionHighlighted: payload,
        selectionHighlighted: null,
      })
    case 'setSelectionHighlighted':
      if (payload == null) return newState
      if (!areOptionsOpen) return reducer(newState, {type: 'clearHighlighted'})

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
        type: 'setSelectionHighlighted',
        payload: moveHighlighted(payload.selection, payload.move, selectionHighlighted, true)
      })
    }
    case 'moveOptionHighlighted': {
      return reducer(newState, {
        type: 'setOptionHighlighted',
        payload: moveHighlighted(payload.filteredOptions, payload.move, optionHighlighted)
      })
    }
    default:
      throw new Error('action not found')
  }
}

export default reducer
