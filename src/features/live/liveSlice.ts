import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LiveMatchData } from '../../models/LiveMatchData'
import { mapper, API_ERROR, } from '../../actions/api'
import { AppThunk } from '../../store/store'
import { setLiveMatchFinished } from '../../routes/Home/homeSlice'

interface LiveMatchState {
  server_steam_id: string;
  isLoading: boolean,
  updated: number,
  data?: LiveMatchData
}

const initialState: LiveMatchState = {
  isLoading: true,
  updated: Date.now(),
  server_steam_id: '',
}

const homeSlice = createSlice({
  name: 'live',
  initialState,
  reducers: {
    subscribeLiveMatch: (state, action: PayloadAction<string>) => {
      state.server_steam_id = action.payload
      return state;
    },
    setLiveMatchDetails : (state, action: PayloadAction<LiveMatchData>) => {
      const payload = action.payload

      state.isLoading = false;
      state.updated = Date.now()
      state.data = payload

      return state
    },
  }
})

export const {
  setLiveMatchDetails,
  subscribeLiveMatch,
} = homeSlice.actions


const isMatchComplete = (matchData: LiveMatchData) => {
  const buildings = matchData.buildings
  if (!matchData.match || !buildings) {
    return true
  }

  return (buildings[17] && buildings[17].destroyed) || (buildings[35] && buildings[35].destroyed)
}

export const subscribeToLiveMatch = (serverSteamId: string): AppThunk => dispatch => {
  subscribeLiveMatch(serverSteamId)
  mapper.sub('dota_live_match', { server_steam_id: serverSteamId }, serverSteamId,
    ({ data }: { data: LiveMatchData }, err?: Error) => {
      if (err) {
        return dispatch({ type: API_ERROR, payload: err })
      }
      dispatch(isMatchComplete(data) ? setLiveMatchFinished() : setLiveMatchDetails(data))
    })
}

export default homeSlice.reducer
