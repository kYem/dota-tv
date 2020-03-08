import { combineReducers } from 'redux'
import home from '../routes/Home/modules/homeReducer'
import streamReducer from '../routes/streams/streamReducer'

const makeRootReducer = (asyncReducers: {} = {}) => combineReducers({
  home,
  streams: streamReducer,
  ...asyncReducers
})

export default makeRootReducer
