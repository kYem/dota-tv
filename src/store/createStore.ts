import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

const middleware = [thunk]
const store = configureStore({
  reducer: rootReducer,
  enhancers: [applyMiddleware(...middleware)]
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store

