
const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content

  case 'SET_SUCCESS_NOTIFICATION':
    state = { content: action.content, success: action.success }
    return state

  case 'ZERO':
    return null

  default:
    return state
  }
}



export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content: content
  }
}

export const setSuccessNotification = (content) => {
  return {
    type: 'SET_SUCCESS_NOTIFICATION',
    content: content,
    success: 'success'
  }
}

export const removeNotification = () => {
  return {
    type: 'ZERO'
  }
}

export default notificationReducer