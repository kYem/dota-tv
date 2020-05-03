import { combineReducers } from '@reduxjs/toolkit'
import streamReducer from '../routes/streams/streamSlice'
import homeReducer from '../routes/Home/homeSlice'
import liveReducer from '../features/live/liveSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  streams: streamReducer,
  live: liveReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
