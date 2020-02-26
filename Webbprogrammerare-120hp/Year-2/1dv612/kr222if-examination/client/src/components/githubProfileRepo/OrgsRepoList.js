import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Event from './Event'
import Repos from './Repos'

const OrgsRepoList = ({auth: { token, user },
  orgslist: { avatar_url, login, events_url, repos_url, url, hooks_url } }) => {
  const [formEvents, setformEvents] = useState({
    eventsArr: null,
    reposArr: null
  })

  const {eventsArr, reposArr: repos} = formEvents

  const fetchEvents = (url) => {
    axios.get(url, {headers: {Authorization: `token ${token}`}}).then((fetchedEvents) => {
      if (fetchedEvents.data[0].length < 0 || fetchedEvents.data[0] === null) return
      setformEvents({eventsArr: fetchedEvents.data})
    })
  }

  const fetchOrgsRepo = (url) => {
    axios.get(url, {headers: {Authorization: `token ${token}` }}).then((fetchedrepos) => {
      if (fetchedrepos.data[0].length < 0 || fetchedrepos.data[0] === null) return
      setformEvents({reposArr: [fetchedrepos.data]})
    })
  }
  
  return (
    <Fragment>
      <ul className='collection'>
        <li className='collection-item avatar'>
          <img className='circle' alt='' src={avatar_url} />
          <span className='title'>{login}</span>
          <p className='secondary-content'><i className='fas fa-align-left' />{' '}Orgs</p>
        </li>
        <li className=' indigo darken-4'>
          <div className='center-align'>
            <button className='btn-floating btn-arge waves-effect indigo darken-3' onClick={() => fetchEvents(events_url)} >Events</button>
          </div>
          <div>
            {eventsArr && eventsArr !== null ? (
              eventsArr.map((event) => (
                <Event key={event.id} event={event} />
                ))
                ) : null }
          </div>
        </li>
        <li className='indigo darken-2'>
          <div className='center-align'>
            <button className='btn-floating btn-arge waves-effect indigo darken-1' onClick={() => fetchOrgsRepo(repos_url)} >Repos</button>
          </div>
          <div className='row'>
            {repos && repos !== null ? (
              repos[0].map((repo) => (
                <Repos key={repo.id} repos={repo} />
                ))
                ) : null }

          </div>
        </li>

      </ul>
    </Fragment>
  )
}

OrgsRepoList.propTypes = {
  events: PropTypes.array
}

const mapStateToProps = state => ({
  events: state.github.events,
  auth: state.auth
})

export default connect(mapStateToProps, { })(OrgsRepoList)
