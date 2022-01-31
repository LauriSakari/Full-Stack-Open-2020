import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReduser'
import './index.css'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer,
  composeWithDevTools())

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'))