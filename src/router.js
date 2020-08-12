import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Pomodoro from './pages/Pomodoro'

function Routes() {
  let customHistory = createBrowserHistory()

  return (
    <Router history={customHistory}>
      <Route path="/" exact component={Projects} />
      <Route path="/tasks/:id" component={Tasks} />
      <Route path="/pomodoro/:id" component={Pomodoro} />
    </Router>
  )
}

export default Routes
