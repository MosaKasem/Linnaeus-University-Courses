import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { githubAuthLogout } from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({ auth: { isAuthenticated, loading, user }, githubAuthLogout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='#!' onClick={githubAuthLogout}>
          <i className='fas fa-sign-out-alt' /> {' '}
          <span className='hide-sm'>
          Logout
          </span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-users' /> {' '}
          <span className='hide-sm'>
          Dashboard
          </span>
        </Link>
      </li>
      <li>
        {user && (
          <Link to={`/profile/:${user.name}`}><i className='fas fa-user-circle' /> {' '}<span className='hide-sm'>Profile</span></Link>
        )}
      </li>
    </ul>
  )
  const guestLinks = (
    <ul>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  )
  return (
    <nav>
      <div className='nav-wrapper green darken-4'>
        <i className='brand-logo right fab fa-github'> Github Notify</i>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
      </div>
    </nav>
  )
}

Navbar.propType = {
  githubAuthLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToDispatch = dispatch => ({
  githubAuthLogout: () => dispatch(githubAuthLogout()),
  auth: dispatch.auth
})

export default connect(mapStateToDispatch, { githubAuthLogout })(Navbar)
