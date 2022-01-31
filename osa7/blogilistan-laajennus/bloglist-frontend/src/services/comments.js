import axios from 'axios'
const baseUrl = '/api/blogs'


const addNew = async ({ comment, blogId }) => {
  const url = `${baseUrl}/${blogId}/comments`
  const commentInfo = {
    content: comment
  }
  const response = await axios.post(url, commentInfo)
  return response.data
}

const commentService = { addNew }

export default commentService