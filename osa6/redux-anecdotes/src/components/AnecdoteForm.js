import React from "react"
import { connect } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {


const addNew = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  props.addNewAnecdote(content)
  props.setMessage(`you added anecdote '${content}'`, 5)
}

return(
<>    
<h2>create new</h2>
  <form onSubmit={addNew}>
    <div><input name='anecdote'/></div>
    <button type='submit'>create</button>
  </form>
</>
)
}

const connectedAnecdoteForm = connect(
  null, 
  { addNewAnecdote, setMessage}
  )(AnecdoteForm)

export default connectedAnecdoteForm