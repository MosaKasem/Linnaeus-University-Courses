import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT,
    USER_LOADED
} from '../actions/types'

const initialState = {
  token: window.localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: 'null',
  uid: window.localStorage.getItem('uid'),
  email: window.localStorage.getItem('email')
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      }
    case LOGIN_SUCCESS:
      window.localStorage.setItem('token', payload.credential.accessToken)
      window.localStorage.setItem('uid', payload.user.uid)
      window.localStorage.setItem('email', payload.user.email)
      return {
        ...state,
        user: payload,
        uid: window.localStorage.getItem('uid'),
        token: window.localStorage.getItem('token'),
        email: window.localStorage.getItem('email'),
        isAuthenticated: true,
        loading: false
      }
    case LOGIN_FAIL:
    case LOGOUT:
    case CLEAR_PROFILE:
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('uid')
      window.localStorage.removeItem('firebaseui::rememberedAccounts')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }
    default:
      return state
  }
}
