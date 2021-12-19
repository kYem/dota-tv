import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match, TopLiveGames } from '../../models/TopLiveGames'
import { API_ERROR, getLiveMatches } from '../../actions/api'
import { AppThunk } from '../../store/store'
import { LobbyType } from '../../models/GameEnums';

interface InitialState {
  serverId: string;
  matches: Match[];
}

const initialState: InitialState = {
  matches: [],
  serverId: '',
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLiveMatches: (state, action: PayloadAction<TopLiveGames>) => {
      const matches = action.payload.game_list

      if (!matches) {
        return { ...state, matches: [] }
      }

      const steamId = state.serverId || matches[0].server_steam_id;
      const matchesWithoutCustom = matches.filter(m => m.lobby_type <= LobbyType.RankedMatchmaking)
      return { ...state, matches: matchesWithoutCustom, serverId: steamId }
    },
    setLiveMatchId: (state, action) => {
      state.serverId = action.payload
      return state;
    },
    setLiveMatchFinished: (state) => {
      state.serverId = ''
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
    err => dispatch({ type: API_ERROR, payload: err.message })
  )
}

export default homeSlice.reducer
