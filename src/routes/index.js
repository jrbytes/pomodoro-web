import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Profile from '../pages/Profile'
import Projects from '../pages/Projects'
import Tasks from '../pages/Tasks'
import Pomodoro from '../pages/Pomodoro'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/projects" component={Projects} isPrivate />
      <Route path="/tasks/:id" component={Tasks} isPrivate />
      <Route path="/pomodoro/:id" component={Pomodoro} isPrivate />
    </Switch>
  )
}

export default Routes
