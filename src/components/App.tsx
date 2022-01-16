import React from 'react'
import '@fontsource/roboto';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'
import { Home } from '../routes/Home/Home'
import { StreamView } from '../routes/streams/StreamView'
import store from '../store/store'
import '../styles/main.scss'
import { ErrorBoundary } from './error/ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <BrowserRouter>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='container'>
              <div className='logo-name-container navbar-brand'>
                <h1>Dota Tv</h1>
              </div>
              <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                  <li className='nav-item'>
                    <NavLink to='/' className='nav-link'>
                      Home
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/streams' className='nav-link'>
                      Streams
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className='container main-container'>
            <div className='page-layout__viewport'>
              <ErrorBoundary>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/streams' element={<StreamView />} />
                </Routes>
              </ErrorBoundary>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
