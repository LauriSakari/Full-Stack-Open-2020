import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  
const filter = useSelector(state => state.filter)

const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())))
const dispatch = useDispatch()

const vote = (anecdote) => {
  dispatch(voteAnecdote(anecdote.id))
  dispatch(setMessage(`you voted '${anecdote.content}'`, 5))
}

return(
<>    
{anecdotes.map(anecdote =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </div>
)}
</>
)
}

export default AnecdoteList