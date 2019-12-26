// @flow
import { LIVE_MATCH_DETAILS, MATCH_FINISHED } from '../../../actions/api'
import { mapAccountToPlayer } from '../../../actions/matchProcessing'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIVE_MATCH_DETAILS] : (state, action) => {
    action.payload.teams.forEach(team => team.players.map(mapAccountToPlayer))
    const oldLive = Object.assign({}, state.live, { ...action.payload })
    oldLive.updated = Date.now()
    return Object.assign({}, state, { live: oldLive })
  },
  [MATCH_FINISHED] : state => Object.assign({}, state, { matches: [], live: null })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function liveReducer(state: any = { live: {} }, action: any) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
