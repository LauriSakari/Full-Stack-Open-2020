import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { SET_BIRTHYEAR } from '../queries'
import Notify from './Notify'

const SetBirthYearForm = ({ authors }) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [error, setError] = useState(null)

  const [ setBirthYear ] = useMutation(SET_BIRTHYEAR, {
    onError: (error) => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    const bornInt = parseInt(born)

    setBirthYear({ variables: { name, setBornTo: bornInt } })

    setBorn('')
  }

  return (

    <div>
      <h2>Set birthyear</h2>
      <Notify errorMessage = {error}/>
      <form onSubmit={submit}>

        <select onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => (
            <option key={ author.name } value={ author.name }>{ author.name }</option>
          ))}
        </select>
        <div>
        born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )

}

export default SetBirthYearForm