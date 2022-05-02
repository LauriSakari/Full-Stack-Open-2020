import { useState, useEffect } from "react"
import { useMutation, useApolloClient } from "@apollo/client"
import { LOGIN, ALL_AUTHORS } from "../queries"
import Notify from "./Notify"


const LoginForm = ({ show, setToken, setPage }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const client = useApolloClient()

   

    const [login, result ] = useMutation(LOGIN, {
      refetchQueries: [ALL_AUTHORS],
      onError: (error) => {
          setError(error.graphQLErrors[0].message)
          setTimeout(() => {
            setError(null)
          }, 5000)
      }
    })

    useEffect(() => {
        if ( result.data ) {
          client.resetStore()
          const token = result.data.login.value
          localStorage.setItem('library-user-token', token)
          setToken(token)
          setPage('authors')
        }
      }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
      }

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
    }

    return (
      <div>
        <Notify errorMessage={error}/>
        <h1> Login page </h1>
          <form onSubmit={submit}>
            <div>
              username: <input 
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password: <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'> login </button>
          </form>
      </div>
    )
}

export default LoginForm