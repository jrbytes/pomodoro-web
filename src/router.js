import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Pomodoro from './pages/Pomodoro'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Projects} />
      <Route path="/tasks/:id" component={Tasks} />
      <Route path="/pomodoro/:id" component={Pomodoro} />
    </BrowserRouter>
  )
}

export default Routes
