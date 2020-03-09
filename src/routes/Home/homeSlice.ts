import { mapAccountToPlayer, matchToPlayers } from '../../actions/matchProcessing'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match, TopLiveGames } from '../../models/TopLiveGames'
import { LiveMatchData } from '../../models/LiveMatchData'
import {
  mapper,
  API_ERROR,
  getLiveMatchDetails,
  getLiveMatches,
} from '../../actions/api'
import { AppThunk } from '../../store/store'

export interface LiveMatchState {
  isLoading: boolean,
  updated: number,
  data?: LiveMatchData
}

interface InitialState {
  server_steam_id: string;
  matches: Match[];
  live: LiveMatchState,
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
        data: payload
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


const isMatchComplete = (matchData: LiveMatchData) => {
  const buildings = matchData.buildings
  if (!matchData.match || !buildings) {
    return true
  }

  return (buildings[17] && buildings[17].destroyed) || (buildings[35] && buildings[35].destroyed)
}

export const getLiveMatch = (serverSteamId: string): AppThunk => async dispatch => {
  getLiveMatchDetails(serverSteamId).then(
    (matchData: LiveMatchData) => {
      // If we still have match, update details otherwise get new live matches
      isMatchComplete(matchData) ? setLiveMatchFinished() : setLiveMatchDetails(matchData)
    },
    err => dispatch({ type: API_ERROR, payload: err })
  )
}

export const loadLiveMatch = (partner = 0): AppThunk => async dispatch => {
  getLiveMatches(partner).then(
    (matchData: TopLiveGames) => {
      dispatch(setLiveMatches(matchData))
    },
    err => dispatch({ type: API_ERROR, payload: err })
  )
}


export const subscribeToLiveMatch = (serverSteamId: string): AppThunk => dispatch => {
  subscribeLiveMatch(serverSteamId)
  mapper.sub('dota_live_match', { server_steam_id: serverSteamId }, serverSteamId,
    ({ data }: { data: LiveMatchData }, err: Error) => {
      if (err) {
        return dispatch({ type: API_ERROR, payload: err })
      }
      dispatch(isMatchComplete(data) ? setLiveMatchFinished() : setLiveMatchDetails(data))
    })
}

export default homeSlice.reducer
