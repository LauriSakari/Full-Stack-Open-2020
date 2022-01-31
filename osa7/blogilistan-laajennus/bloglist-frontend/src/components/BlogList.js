import React from 'react'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {

  if (blogs === null) {
    return null
  }

  return (
    <div>
      <Table >
        <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog blog={blog}/>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList