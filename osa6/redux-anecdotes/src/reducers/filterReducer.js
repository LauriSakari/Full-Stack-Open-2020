const initialState = ''

export const filterAnecdotes = (filter) => {
    return {
        type: 'FILTER',
        data: { filter }
      }
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'FILTER':
        return state = action.data.filter
  
  default:
    return state
    }
}

export default filterReducer