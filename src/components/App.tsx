import React from 'react'
import 'typeface-roboto'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import HomeView from '../routes/Home/HomeView'
import StreamView from '../routes/streams/StreamView'
import store from '../store/store'
import '../styles/main.scss'

class App extends React.Component {

  static shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={store}>
        <React.StrictMode>
          <div style={{ height: '100%' }}>
            <Router>

              <nav className='navbar navbar-expand navbar-dark bg-dark'>
                <div className='container'>
                  <div className='logo-name-container navbar-brand'>
                    <h1>Dota Tv</h1>
                  </div>
                  <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                      <li className='nav-item'>
                        <NavLink to='/' exact className='nav-link' activeClassName='active'>
                          Home
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to='/streams' className='nav-link' activeClassName='active'>
                          Streams
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <div className='container main-container'>
                <div className='page-layout__viewport'>
                  <Route exact path='/' component={HomeView} />
                  <Route path='/streams' component={StreamView} />
                </div>
              </div>

            </Router>
          </div>
        </React.StrictMode>
      </Provider>
    )
  }
}

export default App
