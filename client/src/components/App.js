import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import getCurrentUser from "../services/getCurrentUser"

import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import PlanetList from "./layout/PlanetList"
import PlanetShow from "./layout/PlanetShow"
import updateReviewForm from "./layout/UpdateReviewForm"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <PlanetList user={currentUser} />
        </Route>
        <Route exact path="/planets">
          <PlanetList user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/planets/:id">
          <PlanetShow user={currentUser} />
        </Route>
        <Route exact path="/edit-review" component={updateReviewForm}/>
      </Switch>
    </Router>
  )
}

export default hot(App)
