
const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return state = action.data

  case 'SET_NULL':
    return state = null

  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const resetUser = () => {
  return {
    type: 'SET_NULL'
  }
}

export default userReducer