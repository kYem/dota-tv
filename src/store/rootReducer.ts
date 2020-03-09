import { combineReducers } from '@reduxjs/toolkit'
import home from '../routes/Home/modules/homeReducer'
import streamReducer from '../routes/streams/streamReducer'

const rootReducer = (asyncReducers: {} = {}) => combineReducers({
  home,
  streams: streamReducer,
  ...asyncReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
