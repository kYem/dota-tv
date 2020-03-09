import { combineReducers } from '@reduxjs/toolkit'
import home from '../routes/Home/modules/homeReducer'
import streamReducer from '../routes/streams/streamSlice'

const rootReducer = combineReducers({
  home,
  streams: streamReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
