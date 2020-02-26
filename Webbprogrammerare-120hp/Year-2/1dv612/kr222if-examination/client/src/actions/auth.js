import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    USER_LOADED
} from './types'
// import 'fetch'
import {setAlert} from './alert'
import axios from 'axios'
const url = 'https://api.github.com/'

export const loadUser = (token) => async dispatch => {
  try {
    if (!window.localStorage.getItem('token')) {
      return dispatch({type: CLEAR_PROFILE}) // This is a hack in order to initialize the reducer/state to avoid any errors.
    } else {
      const user = await axios.get(`${url}user`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      dispatch({
        type: USER_LOADED,
        payload: user.data
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const githubAuthLogin = (user) => async dispatch => {
  try {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    })
    dispatch(setAlert('Logged in', 'info'))
  } catch (error) {
    console.log(error)
    dispatch(setAlert('Something has gone wrong', 'error'))
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const githubAuthLogout = () => (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase()
  firebase.auth().signOut()
  dispatch({type: LOGOUT})
  dispatch(setAlert('Logged out', 'alert'))
}
