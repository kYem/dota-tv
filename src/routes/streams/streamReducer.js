import { STREAMS_LOADED } from '../../actions/api'

const ACTION_HANDLERS = {
  [STREAMS_LOADED] : (state, action) => {
    return ({ ...state, data: action.payload, loaded: true })
  },
}

export default function streamReducer(state = { loaded: false, data: [] }, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
