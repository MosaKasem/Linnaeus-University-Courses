import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import profiles from './profiles'
import github from './github'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
  auth: auth,
  alert: alert,
  github: github,
  profiles: profiles,
  firestore: firestoreReducer
})
 