import {
    FETCH_USERS_FROM_DB,
    GET_REPOS_ERROR,
    INSERT_USER_TO_DB,
    LOAD_PROFILE
} from '../actions/types'

const initialState = {
  logIns: [],
  profile: null
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: payload
      }
    case INSERT_USER_TO_DB:
    case FETCH_USERS_FROM_DB:
      return {
        ...state,
        logIns: [payload].sort((a, b) => (
          a.loggedIn.seconds - b.loggedIn.seconds
          )
        )

      }
    case GET_REPOS_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return {
        ...state
      }
  }
}
