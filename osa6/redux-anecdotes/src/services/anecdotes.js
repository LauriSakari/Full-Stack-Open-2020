import axios from 'axios'
import store from '../store'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const url = `${baseUrl}/${id}`
  const votedAnecdote = store.getState().anecdotes.find(a => a.id === id)
  const changedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1}

  const response = await axios.put(url, changedAnecdote)
  return response
}

const exports = { getAll, createNew, voteAnecdote }

export default exports