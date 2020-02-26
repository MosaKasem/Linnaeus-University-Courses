import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducer/index'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import config from './firebaseSetup/config'

const initialState = {}

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware),
    reduxFirestore(config),
    reactReduxFirebase(config))
    )

export default store
