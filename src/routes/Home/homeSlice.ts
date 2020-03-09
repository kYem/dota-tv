import { mapAccountToPlayer, matchToPlayers } from '../../actions/matchProcessing'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match, TopLiveGames } from '../../models/TopLiveGames'
import { LiveMatchData } from '../../models/LiveMatchData'

interface InitialState {
  server_steam_id: string;
  matches: Match[];
  live: { isLoading: boolean, updated: number },
}

const initialState: InitialState = {
  matches: [],
  live: { isLoading: true, updated: Date.now() },
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
    subscribeLiveMatch: (state, action: PayloadAction<string>) => {
      const live = { ...state.live, isLoading: true }
      return ({ ...state, live, server_steam_id: action.payload })
    },
    setLiveMatchDetails : (state, action: PayloadAction<LiveMatchData>) => {
      const payload = action.payload
      payload.teams.forEach((team: any) => {
        team.players.map((player: any) => mapAccountToPlayer(player))
      })

      const liveMatchState = {
        ...state.live,
        isLoading: false,
        updated: Date.now(),
        ...payload
      }

      return { ...state, live: liveMatchState }
    },
    setLiveMatchFinished: (state) => {
      state.live.isLoading = false
      state.server_steam_id = ''
    }
  }
})

export const {
  setLiveMatchDetails,
  setLiveMatches,
  setLiveMatchFinished,
  subscribeLiveMatch,
} = homeSlice.actions

export default homeSlice.reducer

