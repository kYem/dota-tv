import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import config from '../project.config';

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers: never[] = []
  let composeEnhancers = compose

  if (!config.isProd) {
    // @ts-ignore
    let windowElement: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof windowElement === 'function') {
      composeEnhancers = windowElement
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )


  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(makeRootReducer())
    })
  }

  return store
}

export default createStore
