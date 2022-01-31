import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification, setNotification, setSuccessNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import AddNewBlogForm from './components/AddNewBlogForm'
import { initialBlogs, addNewBlog } from './reducers/blogReduser'
import { setUser } from './reducers/userReducer'
import UserList from './components/UserList'
import UserBlogList from './components/UserBlogList'
import BlogInfo from './components/BlogInfo'
import { setUsers, addBlogForUser } from './reducers/usersReducer'
import {
  Switch, Route, Link
} from 'react-router-dom'


const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)


  useEffect(() => {
    blogService
      .getAll().then(blogs =>
        dispatch(initialBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      )
  }, [])

  useEffect(() => {
    userService
      .getAll().then(users => dispatch(setUsers(users)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const addNewBlogFormRef = useRef()

  const handleLogin = async ({ username, password }) => {

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setSuccessNotification(`Welcome ${user.name}` ))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const handleCreateNew = async (blogObject) => {

    try {
      const response = await blogService.addNew(
        blogObject
      )
      const newBlog = {
        id: response.id,
        title: response.title,
        author: response.author,
        url: response.url,
        likes: response.likes,
        user: response.user,
        comments: []
      }
      dispatch(addNewBlog(newBlog))
      dispatch(addBlogForUser(newBlog, response.user.id))
      addNewBlogFormRef.current.toggleVisibility()
      dispatch(setSuccessNotification(`a new blog ${response.title} by ${response.author} added`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
    catch(exeption) {
      dispatch(setNotification(`something went wrong, remember to fill all the fields to add a new blog ${exeption}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <Notification notification={notification}/>

      <LoginForm handleLogin={handleLogin}/>
    </>
  )
  const blogList = () => (

    <div>
      <div className='navigation'>
        <Link className='padding' to="/blogs">blogs</Link>
        <Link className='padding' to="/users">users</Link>
        <UserInfo user={user} />
      </div>
      <h2 className='mt-2'>blogs</h2>
      <Switch>
        <Route path="/blogs/:id">
          <UserInfo user={user} />
          <BlogInfo blogs={blogs}/>
        </Route>
        <Route path="/users/:id">
          <UserInfo user={user} />
          <UserBlogList users={users}/>
        </Route>
        <Route path="/users">
          <UserInfo user={user} />
          <UserList users={users}/>
        </Route>
        <Route path="/">
          <Notification notification = {notification}/>
          <UserInfo user={user} />
          <AddNewBlogForm handleCreateNew={handleCreateNew}
            addNewBlogFormRef={addNewBlogFormRef}/>
          <BlogList blogs={blogs}/>
        </Route>
      </Switch>
    </div>

  )

  return (
    <div className="container">
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App