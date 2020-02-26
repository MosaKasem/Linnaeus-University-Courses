import {
    GITHUB_ORGS_REPOS,
    INSERT_USER_REPOS
} from '../actions/types'

const initialState = {
  orgs: [],
  events: [], // Decisions - The react app was consuming alot of resources - This was moved to OrgsRepoList.js in react state
  repos: [],
  issues: []
}

export default function (state = initialState, actions) {
  const { type, payload } = actions
  switch (type) {
    case GITHUB_ORGS_REPOS:
      return {
        ...state,
        orgs: [...payload]
      }
    case INSERT_USER_REPOS:
      return {
        ...state,
        repos: [...payload]
      }
    default:
      return state
  }
}
