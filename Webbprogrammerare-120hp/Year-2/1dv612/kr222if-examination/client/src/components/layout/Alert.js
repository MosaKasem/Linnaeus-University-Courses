import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {useTransition, animated} from 'react-spring'

const Alert = ({ alerts }) => {
  return (
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`note msg msg-${alert.alertType}`}>
      {alert.msg}
    </div>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
