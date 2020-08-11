import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Tasks from './pages/Tasks'
import Pomodoro from './pages/Pomodoro'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Tasks} />
      <Route path="/pomodoro/:id" component={Pomodoro} />
    </BrowserRouter>
  )
}

export default Routes
