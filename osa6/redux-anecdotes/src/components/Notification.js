
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notification
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== null) {
  return (
    <div style={style}>
      {notification}
    </div>
  )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotes = connect(mapStateToProps)(Notification)
export default ConnectedNotes