import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import homeReducer from '../routes/Home/homeSlice';
import streamReducer from '../routes/streams/streamSlice';
import liveReducer from '../features/liveSlice';
import { apiSlice } from '../actions/api';

const store = configureStore({
  reducer: {
    home: homeReducer,
    streams: streamReducer,
    live: liveReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store

