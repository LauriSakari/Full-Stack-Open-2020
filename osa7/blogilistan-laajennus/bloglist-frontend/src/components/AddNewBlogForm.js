import React from 'react'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const AddNewBlogForm = ({ handleCreateNew, addNewBlogFormRef }) => {
  return (
    <div className="mt-2 mb-2">
      <Togglable id='createNewButton' buttonLabel='create new blog' ref={addNewBlogFormRef}>
        <CreateNewBlog
          handleCreateNew={handleCreateNew}
        />
      </Togglable>
    </div>
  )}

export default AddNewBlogForm