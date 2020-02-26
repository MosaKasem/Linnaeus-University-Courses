import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from '../../firebaseSetup/config'
import { storeLoggedInUser } from '../../actions/profiles'
import { loadUser, githubAuthLogin } from '../../actions/auth'

const Login = ({ githubAuthLogin, storeLoggedInUser, isAuthenticated, loadUser }) => {
  const provider = new firebase.auth.GithubAuthProvider()
  const logon = () => { // TODO: replace method name to something thats not same as "Login"
    provider.addScope('user read:org repo admin:org admin:org_hook admin:repo_hook')
    firebase.auth().signInWithPopup(provider).then((user) => {
      storeLoggedInUser(user)
      githubAuthLogin(user)
      loadUser(user.credential.accessToken) // CONTINUE HERE
    })
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <div className='App row'>
      <button className='waves-effect grey darken-3 btn noUpperCase' onClick={() => logon()}>
        <i className='fab fa-github-alt'> {' '}
        Sign in with Github
        </i>
      </button>
    </div>
  )
}

Login.propTypes = {
  githubAuthLogin: PropTypes.func.isRequired,
  storeLoggedInUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return {
    storeLoggedInUser: (profiles) => dispatch(storeLoggedInUser(profiles)),
    isAuthenticated: dispatch.auth.isAuthenticated
  }
}

export default connect(mapDispatchToProps, { githubAuthLogin, storeLoggedInUser, loadUser })(Login)
