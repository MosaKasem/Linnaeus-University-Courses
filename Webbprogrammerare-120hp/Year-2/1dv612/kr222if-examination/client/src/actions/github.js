import { setAlert } from './alert'
import {
    GITHUB_ORGS_REPOS,
    INSERT_USER_REPOS
  } from '../actions/types'

import RequestPR from 'request-promise-native'
import 'fetch'

const url = 'https://api.github.com/'
const webhookURL = 'https://us-central1-github-firebase-auth.cloudfunctions.net/webhook'

export const getOrgs = (token) => async dispatch => {
  const options = {
    url: `${url}user/orgs`,
    headers: {
      'Authorization': `token ${token}`
    },
    json: true
  }
  try {
    const res = await RequestPR(options)
    dispatch({
      type: GITHUB_ORGS_REPOS,
      payload: res
    })
  } catch (error) {
    dispatch(setAlert(`${error}`, 'alert'))
    console.log('error: ', error)
  }
}

export const getUserRepos = (token) => async dispatch => {
  const options = {
    url: `${url}user/repos`,
    headers: {
      'Authorization': `token ${token}`
    },
    json: true
  }
  try {
    const res = await RequestPR(options)
    dispatch({
      type: INSERT_USER_REPOS,
      payload: res
    })
  } catch (error) {
    console.log('error: ', error)
  }
}

export const createHook = (user, repo, token, uid, email) => async (dispatch, getState, {getFirestore, getFirebase}) => {
  console.log('email: ', email);
  const firestore = getFirestore()
  const options = {
    url: `${url}repos/${user}/${repo}/hooks`,
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`
    },
    body:
      JSON.stringify({
        name: 'web',
        active: true,
        events: [
          'release',
          'repository',
          'push',
          'issues',
          'issue_comment'
        ],
        config: {
          url: webhookURL,
          content_type: 'json',
          insecure_ssl: '1'
        },
        json: true
      })
  }
  try {
    const webhook = await RequestPR(options)
    const parsedWebHook = JSON.parse(webhook)
    const webhooks = firestore.collection(`${user}`).doc(`${repo}`)
    webhooks.get().then((doc) => {
      if (!doc.exists) {
        firestore.collection(`${user}`).doc(`${repo}`).set({
          webhook: parsedWebHook,
          owner: user,
          email: email,
          sendMail: true
        })
      }
    })
  } catch (error) {
    dispatch(setAlert(`There was an error: ${error.message}`, 'alert'))
  }
}
