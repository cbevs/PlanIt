import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import getCurrentUser from "../services/getCurrentUser"

import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./TopBar"
import PlanetList from "./PlanetList"
import PlanetShow from "./PlanetShow"
import UpdateReviewForm from "./UpdateReviewForm"
import Footer from "./Footer"

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
        <Route exact path="/reviews/:id/edit" component={UpdateReviewForm}/>
      </Switch>
      <Footer />
    </Router>
  )
}

export default hot(App)
