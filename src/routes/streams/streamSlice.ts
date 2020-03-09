import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { getLiveStreams } from '../../actions/api'

let initialState = { loaded: false, error: undefined, data: [] }

const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    setStreams(state, action: PayloadAction<any>) {
      state.data = action.payload
      state.loaded = true
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload
      state.loaded = true
    },
  }
})

export const { setStreams, setError } = streamsSlice.actions
export default streamsSlice.reducer


export const getLiveStreamsDetails = (): AppThunk => async dispatch => {
  try {
    const repoDetails = await getLiveStreams()
    dispatch(setStreams(repoDetails))
  } catch (err) {
    dispatch(setError(err))
  }
}
