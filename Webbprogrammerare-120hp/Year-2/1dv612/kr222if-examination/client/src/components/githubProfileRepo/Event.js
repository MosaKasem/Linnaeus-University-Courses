import React, { Fragment } from 'react'
import EventCommits from './EventCommits'

const Event = ({ event: { actor: { login, avatar_url }, payload, type } }) => {
  return (

    <div className='collection-item avatar'>
      <img src={avatar_url} alt='' className='circle' />
      <span className='title'>{login}</span> <br />
      <span className='title'>{type}</span>
      <div>Commits <br />
        {payload && payload.commits !== undefined ? (
              payload.commits.map((commit) => (
                <EventCommits key={commit.sha} eventcommits={commit} />
              ))
          ) : <p className='msg-alert'>No commits</p>
        }
      </div>
    </div>

  )
}

export default Event
