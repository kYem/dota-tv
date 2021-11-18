import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import homeReducer from '../routes/Home/homeSlice';
import streamReducer from '../routes/streams/streamSlice';
import liveReducer from '../features/liveSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    streams: streamReducer,
    live: liveReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store

