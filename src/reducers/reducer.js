import moveHighlighted from '../utils/moveHighlighted'

const mergeState = (state, merge) => {
  let newState = state

  Object.keys(merge).forEach((key) => {
    if (newState[key] !== merge[key]) newState = {...newState, [key]: merge[key]}
  })

  return newState
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAreOptionsOpen':
      return reducer(state, {type: action.payload ? 'openOptions' : 'closeOptions'})
    case 'openOptions':
       return mergeState(state, {areOptionsOpen: true})
    case 'closeOptions':
       return mergeState(state, {areOptionsOpen: false})
    case 'setSearchText':
      return mergeState(state, {searchText: action.payload})
    case 'clearSearchText':
      return mergeState(state, {searchText: ''})
    case 'setPlaceholder':
      return mergeState(state, {placeholder: action.payload})
    case 'setWidth':
      return mergeState(state, {width: action.payload})
    case 'clearOptionHighlighted':
      return mergeState(state, {optionHighlighted: null})
    case 'clearSelectionHighlighted':
      return mergeState(state, {selectionHighlighted: null})
    case 'setOptionHighlighted':
      return mergeState(state, {
        optionHighlighted: action.payload,
        selectionHighlighted: null,
      })
    case 'setSelectionHighlighted':
      return mergeState(state, {
        selectionHighlighted: action.payload,
        optionHighlighted: null,
      })
    case 'clearHighlighted':
      return mergeState(state, {
        selectionHighlighted: null,
        optionHighlighted: null,
      })
    case 'moveSelectionHighlighted': {
      return reducer(state, {
        type: 'setSelectionHighlighted',
        payload: moveHighlighted(action.payload.selection, action.payload.move, state.selectionHighlighted, true)
      })
    }
    case 'moveOptionHighlighted': {
      return reducer(state, {
        type: 'setOptionHighlighted',
        payload: moveHighlighted(action.payload.filteredOptions, action.payload.move, state.optionHighlighted)
      })
    }
    default:
      throw new Error('action not found')
  }
}

export default reducer
