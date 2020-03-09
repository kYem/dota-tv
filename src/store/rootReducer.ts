import { combineReducers } from '@reduxjs/toolkit'
import streamReducer from '../routes/streams/streamSlice'
import homeReducer from '../routes/Home/homeSlice'

const rootReducer = combineReducers({
  home: homeReducer,
  streams: streamReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
