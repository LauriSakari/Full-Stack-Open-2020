import React from 'react'
import { useDispatch } from 'react-redux'
import { resetUser } from '../reducers/userReducer'

const UserInfo = ({ user, /*handleLogout*/ }) => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )
    dispatch(resetUser())
  }

  return (
    <> {user.name} logged in <button onClick={handleLogout}>logout</button></>
  )
}

export default UserInfo