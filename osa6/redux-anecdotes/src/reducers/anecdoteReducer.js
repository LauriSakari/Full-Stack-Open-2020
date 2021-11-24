import anecdoteService from '../services/anecdotes'

export const addNewAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
    type: 'ADD_NEW',
    data: newAnecdote
  })
  }
} 

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
    type: 'INCREMENT_VOTE',
    data: { id }
  })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
 }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT_VOTE':
      const id = action.data.id
      const anecdoteToChance = state.find(a => a.id === id)
      const newVoteCount = anecdoteToChance.votes + 1
      const changedAnecdote = {...anecdoteToChance, votes: newVoteCount}
      const newVoteAdded = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      const sortedByVotesState = newVoteAdded.sort((a, b) => b.votes - a.votes)

      return sortedByVotesState
    case 'ADD_NEW':
      console.log(action.data)
      const newAnecdote = action.data
  
    return state = [...state, newAnecdote] 
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
  
  default:
    return state
}
}

export default anecdoteReducer