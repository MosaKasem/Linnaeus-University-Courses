import { setAlert } from './alert'
import {
  FETCH_USERS_FROM_DB,
  GET_REPOS_ERROR,
  INSERT_USER_TO_DB,
  LOAD_PROFILE
} from '../actions/types'

import axios from 'axios'
const url = 'https://api.github.com/'

export const storeLoggedInUser = (profile) => {
  const { username } = profile.additionalUserInfo
  const { avatar_url } = profile.additionalUserInfo.profile
  const { uid } = profile.user

  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore()
    const increment = getFirebase().firestore.FieldValue.increment(1)

    const user = firestore.collection('userLoggedIn').doc(uid)

    user.get().then((docSnap) => {
      if (!docSnap.exists) { // If the document does not exists create
        firestore.collection('userLoggedIn').doc(uid).set({
          authorName: username,
          photoUrl: avatar_url,
          uid: uid,
          loggedIn: new Date(),
          loggedInTimes: 1
        })
      } else { // else update and increment loginTimes++ 
          user.update({
          loggedIn: new Date(),
          loggedInTimes: increment
          })
      }
    })
  }
}

export const loadLoggedInUsers = () => {
  return (dispatch, getState, {getFirestore}) => {
    const dataArr = []
    const firestore = getFirestore()
    firestore.collection('userLoggedIn').get().then((profile) => {
      profile.forEach(nameAndDate => {
        dataArr.push(nameAndDate.data())
      }) // Needs more tinkering. Unfinished
      dataArr.sort((a, b) => {
        return a.loggedIn.seconds - b.loggedIn.seconds
      })
      dispatch({
        type: FETCH_USERS_FROM_DB,
        payload: dataArr
      })
    })
  }
}

// export const getProfile = (username) => async dispatch => {
//   try {

//   } catch (error) {

//   }
// }
