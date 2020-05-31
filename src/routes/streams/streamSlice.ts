import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { getLiveStreams } from '../../actions/api'
import { Stream } from '../../models/Stream'

const initialState: { loaded: boolean; data: Stream[]; error: string } = {
  loaded: false,
  error: '',
  data: []
}

const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    setStreams(state, action: PayloadAction<Stream[]|null>) {
      state.data = Array.isArray(action.payload) ? action.payload: []
      state.loaded = true
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loaded = true
    },
  }
})

export const { setStreams, setError } = streamsSlice.actions
export default streamsSlice.reducer


export const getLiveStreamsDetails = (): AppThunk => async dispatch => {
  getLiveStreams().then(
    streams => dispatch(setStreams(streams)),
    // handle only request error, otherwise it would catch setStreams error
    err => dispatch(setError(err.toString()))
  )
}
