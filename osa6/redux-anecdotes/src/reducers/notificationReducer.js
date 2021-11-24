
const initialState = null
let timeoutId 

export const setMessage = (content, seconds) => {
  const milliseconds = seconds * 1000
  clearTimeout(timeoutId)
  return async dispatch => { 
    await dispatch({
    type: 'SET_MESSAGE',
    data: content
  })
  timeoutId = setTimeout(() => {
    dispatch(setNullMessage())
  }, milliseconds)
  }
}

export const setNullMessage = () => {
  return {
    type: 'ZERO'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {    
    case 'SET_MESSAGE': 
      return state = action.data
    
    case 'ZERO':
      return null

    default:
      return state
}
}

export default notificationReducer