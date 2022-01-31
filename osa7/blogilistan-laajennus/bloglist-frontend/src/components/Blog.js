import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return(
    <div>
      <div id={'basicInfo'} >
        <Link to={`/blogs/${blog.id}`} > {blog.title} </Link>
      </div>
    </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog