import { React } from 'react'

const Notification = ( { notification } ) => {


  if ( notification === null) {
    return null
  }
  if (notification.success) {
    return (
      <div className="alert alert-success" role="alert">
        {notification.content}
      </div>
    )
  }
  return (
    <div className="alert alert-danger" role="alert">
      {notification}
    </div>
  )
}

export default Notification