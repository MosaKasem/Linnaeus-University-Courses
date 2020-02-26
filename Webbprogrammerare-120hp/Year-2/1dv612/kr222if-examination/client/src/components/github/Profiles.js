import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import requestPN from 'request-promise-native'
import Request from 'superagent'
import axios from 'axios'

const Profiles = ({ profiles: {authorName, loggedIn, photoUrl, loggedInTimes}, auth: { user: { name } } }) => {
  const date = new Date(loggedIn ? loggedIn.seconds * 1000 : null)
  return (
    <Fragment>
      {authorName !== null ? (
        <Fragment>
          <img src={!photoUrl ? null : photoUrl} alt='' className='circle' /> 
          <span className='title'>
            <i className='fas fa-user' /> {' '}
            {authorName} {' '} <i className="fas fa-angle-double-left">{' '}Logged in {loggedInTimes} times</i>
          </span>
          <p>
            {`Logged in date: ${date.getFullYear()}/${date.getDate()}/${date.getDate()} Time: ${date.getHours()}:${date.getMinutes()}`}
            <br />
            {authorName === name ? (
              <Link to={`/profile/:${authorName}`} className='btn waves-effect waves-light noUpperCase'>Profile</Link>
              ) : <Link to='#' className='btn disabled noUpperCase'>Profile</Link>
            }
          </p>
            
        </Fragment>
      ) : (
        <Fragment>
          <h4>No Profiles Found</h4>
        </Fragment>
      )
    }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Profiles)
