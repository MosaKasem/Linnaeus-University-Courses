import { SET_ALERT, REMOVE_ALERT } from '../actions/types'
import uuid from 'uuid'

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4()
  setTimeout(() => dispatch({
    type: SET_ALERT,
    payload: {msg, alertType, id}
  }), 100)

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }), 6000)
}
