import React, { useEffect } from 'react'
import Notification from './Notification'
import Profiles from '../github/Profiles'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // Higher order component
import { compose } from 'redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { loadLoggedInUsers } from '../../actions/profiles'
import { Row, Collection, CollectionItem } from 'react-materialize'

const Dashboard = ({profiles, loadLoggedInUsers, notification}) => {
  useEffect(() => {
    loadLoggedInUsers()
  }, [loadLoggedInUsers])
  return (
    <div className='dashboard'>
      <div className='profiles'>
        <Row>
          <Collection>
            <CollectionItem className='avatar'>
              {
              profiles && profiles.length > 0 ? (profiles.map((profile, index) => (
                <Profiles key={profile.id} profiles={profile} />
              ))) : <Spinner />
            }
            </CollectionItem>
          </Collection>
        </Row>
      </div>
      <div className='col s12 m5 offset-m1'>
        <Notification notification={notification}/>
      </div>

    </div>
  )
}

Dashboard.prototype = {
  profiles: PropTypes.object,
  loadLoggedInUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.userLoggedIn,
    notification: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps, {loadLoggedInUsers: loadLoggedInUsers}), 
  firestoreConnect([
    {collection: 'userLoggedIn'}, // Tells it to listen to 'UsersLog' collection from firebase database
    {collection: 'notifications', limit: 5}
  ]) // firebase database is now in sync with combineReducers
)(Dashboard)
