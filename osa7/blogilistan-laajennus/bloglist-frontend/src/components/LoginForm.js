import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => {

  const login = (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    handleLogin({
      username: username,
      password: password
    })

    event.target[0].value = ''
    event.target[1].value = ''
  }

  return(
    <div>
      <h2>Login</h2>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm