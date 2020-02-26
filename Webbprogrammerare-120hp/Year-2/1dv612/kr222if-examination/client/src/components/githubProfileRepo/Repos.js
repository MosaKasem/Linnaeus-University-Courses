import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import 'fetch'
import requestPN from 'request-promise-native'
import { createHook } from '../../actions/github'
import PropTypes from 'prop-types'

const Repos = ({ createHook, auth: { token, email, user: {login}, uid }, repos: { open_issues, size, name, permissions, id } }) => {
  return (
    <div className='col s4'>
      <div className='container section project-details'>
        <div className='card z-depth-0'>
          <div className='card-content'>
            <span className='small card-title'>{name}</span>
          </div>
          <div className='card-action gret lighten-4 grey-text'>
            <div className='valign center'>Issues: {open_issues > 0 ? (<p className='red accent-4'>{open_issues}</p>) : (<p className='indigo darken-1'>{open_issues}</p>)}
            </div>
            <div>Size: {size} kb</div>
            {permissions.admin === true && (
              <ul>
                <li className='center-align indigo darken-3'>
                  <button className='btn waves-effect indigo darken-2' onClick={() => createHook(login, name, token, uid, email)} >CreateWebHook</button>
                  <div className='row' />
                </li>
              </ul>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    auth: dispatch.auth,
    createHook: (webhook) => dispatch(createHook(webhook))
  }
}


Repos.prototype = {
  createHook: PropTypes.func.isRequired
}

export default connect(mapDispatchToProps, { createHook })(Repos)
