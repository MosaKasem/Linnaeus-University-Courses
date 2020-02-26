import React from 'react'

const EventCommits = ({eventcommits: {message}, eventcommits }) => {
  return (
    <p className='msg-info'>
      {message}
    </p>
  )
}

export default EventCommits
