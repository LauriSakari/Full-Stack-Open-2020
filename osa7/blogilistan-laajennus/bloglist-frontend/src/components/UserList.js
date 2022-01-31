import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

  if (users === null) {
    return null
  }

  return(
    <div>
      <h2 className="mt-2">Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th className="pl-2">Blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td >
                <Link to={`/users/${user.id}`}> {user.name}</Link>
              </td>
              <td className="pl-2"> {user.blogs.length}</td>
            </tr> )}
        </tbody>
      </table>
    </div>

  )
}

export default UserList