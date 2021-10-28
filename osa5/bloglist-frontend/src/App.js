import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (errorMessage === null && successMessage) {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw(exception)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(
      'loggedNoteappUser'
    )
    setUser(null)
  } 

  const handleCreateNew = async (event) => {
    event.preventDefault()
    console.log('event', event)
    console.log('handle create ', title, author, url)
    
  try {  
    const response = await blogService.addNew ({
      title, author, url
    })
    console.log('handle create ', response)
    const newBlog = {
      id: response.id,
      title: response.title,
      author: response.author,
      url: response.url,
      likes: response.likes,
      user: response.user
    }
    console.log(newBlog)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  catch(exeption) {
    setErrorMessage(`something went wrong ${exeption}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  const loginForm = () => (
  <>
  <h2>Login</h2>
  <Notification message={errorMessage}/>
  
  <form onSubmit={handleLogin}>
  <div>
    username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
    />
  </div>
  <button type="submit">login</button>
</form>
</>
  )

  const blogList = () => (
  <div>
  <h2>blogs</h2>
  <Notification message={successMessage} />
  <Notification message={errorMessage} />
  <p> {user.name} logged in  <button onClick={handleLogout}>logout</button></p>
  <h2> create new </h2>
  <form onSubmit={handleCreateNew}>
    <div>
      title: 
      <input
      type='title'
      value={title}
      name='Title'
      onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author: 
      <input
      type='author'
      value={author}
      name='Author'
      onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url: 
      <input
      type='url'
      value={url}
      name='Url'
      onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit" onClick={handleCreateNew}>create</button>
  </form>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
</div>
  )

  return (
  <>
      {user === null ?
      loginForm() :
      blogList()
    }  

  </>
  )
}

export default App