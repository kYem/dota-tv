import { LIVE_MATCH_DETAILS, LIVE_MATCH_SUBSCRIBE, LIVE_MATCHES, MATCH_FINISHED } from '../../../actions/api'
import { mapAccountToPlayer, matchToPlayers } from '../../../actions/matchProcessing'

const ACTION_HANDLERS = {
  [LIVE_MATCHES] : (state, action) => {
    const gameMatches = action.payload.game_list

    if (!gameMatches) {
      return { ...state, matches: [] }
    }

    const matches = gameMatches.map(match => matchToPlayers(match))
    let steamId = state.server_steam_id
    if (steamId === '') {
      steamId = matches[0].server_steam_id
    }

    return { ...state, matches, server_steam_id: steamId }
  },
  [LIVE_MATCH_SUBSCRIBE] : (state, action) => {
    const live = { ...state.live, isLoading: true }
    return ({ ...state, live, server_steam_id: action.payload })
  },
  [LIVE_MATCH_DETAILS] : (state, action) => {
    const payload = action.payload
    payload.teams.forEach((team) => {
      team.players.map(player => mapAccountToPlayer(player))
    })

    const liveMatchState = { ...state.live, isLoading: false, updated: Date.now(), ...payload }
    const liveMatch = state.matches.find(match => match.server_steam_id === payload.match.server_steam_id)

    // Only update if we have a found live match
    if (liveMatch) {
      liveMatchState.average_mmr = liveMatch.average_mmr
    }

    return { ...state, live: liveMatchState }
  },
  [MATCH_FINISHED] : state => ({ ...state, live: null, server_steam_id: '' })
}

const initialState = {
  matches: [],
  live: { isLoading: true },
  server_steam_id: '',
}

export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
