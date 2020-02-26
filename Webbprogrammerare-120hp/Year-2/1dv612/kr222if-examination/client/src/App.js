import React, { Fragment, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import { loadUser } from './actions/auth'
import { getUserRepos } from './actions/github'
import UserOrgs from './components/githubProfileRepo/UserOrgs'

/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 * @returns
 */

const token = window.localStorage.getItem('token')

function App () {
  useEffect(() => {
    store.dispatch(loadUser(token))
    store.dispatch(getUserRepos(token))
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='nav-wrapper'>
            <Alert />
            <Switch>
              <PrivateRoute exact path='/userRepos' component={Dashboard} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/profile/:id' component={UserOrgs} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

/**
 * @Unfinished_Minor_Issues
 * Sorting users login times from last to latest in @dashboard
 * When there are no events, returns null. If changed, other than null, it would show on all @githubProfileRepo_OrgsRepoList
 * When user logins in, he will be redirected to dashboard, the profiles gets loaded from Firebase database but not for the state manager = (redux), only after page refresh the initial values gets updated, Users button greyed out // @dashboard
 * @dashboard_UPDATE The reason behind the button being greyed out after first login was due to firebase listener. the data is fetched first.
 */

/**
 * @Reflection
 * Move all functions that has to do with firebase whenever possible, into it's own folder, easier to debug if an error is linked to firebase
 */

export default App
