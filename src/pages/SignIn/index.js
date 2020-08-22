import React, { useRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import './styles.css'

const SignIn = () => {
  const emailRef = useRef(null)

  const { signIn } = useAuth()
  const history = useHistory()

  const { handleSubmit, register, errors, setError } = useForm()

  const [credentials, setCredentials] = useState(false)

  const onSubmit = useCallback(
    async data => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        })

        history.push('/projects')
      } catch (error) {
        console.log(error)
        setError()
        setCredentials(true)
      }
    },
    [signIn, history, setError],
  )

  return (
    <div className="container-signin">
      <div className="title-signin">Login</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="email"
          name="email"
          ref={e => {
            register(e, {
              required: {
                value: true,
                message: 'É necessário incluir um e-mail.',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Inclua um e-mail válido.',
              },
            })
            emailRef.current = e
          }}
        />

        <input
          type="password"
          name="password"
          ref={register({
            required: {
              value: true,
              message: 'É necessário incluir uma senha.',
            },
            minLength: {
              value: 6,
              message: 'Sua senha deve ter 6 caracteres no mínimo.',
            },
          })}
        />

        <div className="form-buttons-modal">
          <input type="submit" value="Entrar" />
        </div>
      </form>
      {errors.email && <span>{errors.email.message}</span>}
      {errors.password && <span>{errors.password.message}</span>}
      {credentials && <span>Suas credenciais estão incorretas</span>}
    </div>
  )
}

export default SignIn
