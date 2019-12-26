// @flow
import { STREAMS_LOADED } from '../../actions/api'

const ACTION_HANDLERS = {
  [STREAMS_LOADED] : (state, action) => {
    return ({ ...state, data: action.payload, loaded: true })
  },
}

export default function streamReducer(state: any = { loaded: false, data: [] }, action: any) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
