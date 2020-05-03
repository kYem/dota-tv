import { matchToPlayers } from '../../actions/matchProcessing'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match, TopLiveGames } from '../../models/TopLiveGames'
import { API_ERROR, getLiveMatches } from '../../actions/api'
import { AppThunk } from '../../store/store'

interface InitialState {
  server_steam_id: string;
  matches: Match[];
}

const initialState: InitialState = {
  matches: [],
  server_steam_id: '',
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLiveMatches: (state, action: PayloadAction<TopLiveGames>) => {
      const gameMatches = action.payload.game_list

      if (!gameMatches) {
        return { ...state, matches: [] }
      }

      const matches = gameMatches.map((match: Match) => matchToPlayers(match))
      let steamId = state.server_steam_id
      if (steamId === '') {
        steamId = matches[0].server_steam_id
      }

      return { ...state, matches, server_steam_id: steamId }
    },
    setLiveMatchId: (state, action) => {
      state.server_steam_id = action.payload
      return state;
    },
    setLiveMatchFinished: (state) => {
      state.server_steam_id = ''
      return state
    }
  }
})

export const {
  setLiveMatches,
  setLiveMatchId,
  setLiveMatchFinished,
} = homeSlice.actions


export const loadLiveMatch = (partner = 0): AppThunk => async dispatch => {
  getLiveMatches(partner).then(
    (matchData: TopLiveGames) => {
      dispatch(setLiveMatches(matchData))
    },
    err => dispatch({ type: API_ERROR, payload: err })
  )
}

export default homeSlice.reducer
