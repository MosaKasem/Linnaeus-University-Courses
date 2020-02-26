import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getOrgs } from '../../actions/github'
import { connect } from 'react-redux'
import OrgsRepoList from './OrgsRepoList'
import Spinner from '../layout/Spinner'
import Repos from './Repos'

const UserOrgs = ({ github: {orgs, repos}, getOrgs, auth: { token } }) => {
  useEffect(() => {
    getOrgs(token)
  }, [getOrgs, token])

  return (
    <Fragment>
      <div>
        <h3 className='brand-logo white'>Your Organisations</h3>
        {orgs ? (
        orgs.map((org) => (
          <OrgsRepoList key={org.id} orgslist={org} />
        ))
        ) : (
          <Spinner />
        )
        }
        <h3 className='brand-logo white'>Your Personal Repos</h3>
        <ul className='collection'>
          <li className='indigo darken-2'>
            <div className='row'>
              {repos ? (
              repos.map((repo) => (
                <Repos key={repo.id} repos={repo} />
              ))
              ) : <h5>No Repos found!</h5>}
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

UserOrgs.propTypes = {
  getOrgs: PropTypes.func.isRequired,
  profiles: PropTypes.object,
  github: PropTypes.object,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  github: state.github,
  auth: state.auth
})

export default connect(mapStateToProps, { getOrgs })(UserOrgs)
