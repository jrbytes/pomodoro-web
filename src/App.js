import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AuthProvider } from './hooks/auth'

import Routes from './routes'
import store from './store'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </AuthProvider>
    </Router>
  )
}

export default App
